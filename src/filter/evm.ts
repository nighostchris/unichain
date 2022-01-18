/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import BigNumber from 'bignumber.js';
import { ethers, BigNumber as ethersBigNumber } from 'ethers';
import { EVM_MINIMUM_UNIT } from '..';

import { ERC20_TRANSFER_FUNCTION, ERC20_TRANSFER_EVENT, TRANSFER_TOPIC } from '../constants';
import { IErc20Event, IFilterEvmTransactionParams, IFilterTransaction } from '../interfaces';

export function decodeErc20Log(log: ethers.providers.Log): IErc20Event {
  const erc20Interface = new ethers.utils.Interface([
    ERC20_TRANSFER_EVENT,
    ERC20_TRANSFER_FUNCTION,
  ]);

  const decodedFields = erc20Interface.parseLog(log);

  return {
    from: decodedFields.args[0],
    to: decodedFields.args[1],
    value: ethersBigNumber.from(decodedFields.args[2]).toString(),
  };
}

export async function filterEvmTransaction(params: IFilterEvmTransactionParams): Promise<IFilterTransaction[]> {
  const {
    blockchain, transaction, trackedAddresses, connection,
  } = params;
  let foundToken = false;
  let calculateFee = false;
  const transactions: IFilterTransaction[] = [];
  const trackedAddressesHashmap: { [address: string]: boolean } = {};
  const commonLog = `filterEvmTransaction (${blockchain}:${transaction.hash}) -`;

  for (const addr of trackedAddresses) {
    trackedAddressesHashmap[addr.toLowerCase()] = true;
  }

  const provider = new ethers.providers.JsonRpcProvider(connection.endpoint);

  const receipt = await provider.getTransactionReceipt(transaction.hash);

  // Non-native token transfer filtering
  if (receipt.logs.length) {
    for (const log of receipt.logs) {
      // ERC-20 token transfer transaction
      if (Array.isArray(log.topics) && log.topics.includes(TRANSFER_TOPIC)) {
        const { from, to, value } = decodeErc20Log(log);

        if (trackedAddressesHashmap[transaction.from.toLowerCase()]
          || trackedAddressesHashmap[to.toLowerCase()]) {
          calculateFee = true;
          foundToken = true;

          const erc20Tx: IFilterTransaction = {
            blockNumber: receipt.blockNumber.toString(10),
            hash: receipt.transactionHash,
            origin: from,
            destination: to,
            contract: receipt.to,
            value: new BigNumber(value)
              .dividedBy(EVM_MINIMUM_UNIT)
              .toString(10),
            type: 'payment',
            memo: '',
            blockchain,
          };

          console.log(`[INFO] ${commonLog} Found ERC-20 transaction: ${JSON.stringify(erc20Tx)}`);

          transactions.push(erc20Tx);
        }
      }
    }
  }

  // Native token transfer filtering
  if (transaction.value !== '0x00'
    && trackedAddressesHashmap[transaction.from.toLowerCase()]
    && trackedAddressesHashmap[typeof transaction.to !== 'undefined' ? transaction.to.toLowerCase() : '']) {
    calculateFee = true;

    const tx: IFilterTransaction = {
      blockNumber: receipt.blockNumber.toString(10),
      hash: transaction.hash,
      origin: transaction.from,
      destination: receipt.to,
      value: new BigNumber(transaction.value)
        .dividedBy(EVM_MINIMUM_UNIT)
        .toString(10),
      type: 'payment',
      memo: !foundToken ? transaction.data : '',
      blockchain,
    };

    console.log(`[INFO] ${commonLog} Found native transaction: ${JSON.stringify(tx)}`);

    transactions.push(tx);
  }

  // Fee calculation
  if (calculateFee) {
    transactions.push({
      blockNumber: receipt.blockNumber.toString(10),
      hash: transaction.hash,
      origin: transaction.from,
      destination: receipt.to,
      value: new BigNumber(receipt.gasUsed.toString())
        .multipliedBy(new BigNumber(String(transaction.gasPrice)))
        .dividedBy(EVM_MINIMUM_UNIT)
        .toString(10),
      type: 'fee',
      memo: !foundToken ? transaction.data : '',
      blockchain,
    });
  }

  return transactions;
}
