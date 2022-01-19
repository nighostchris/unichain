/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import { ethers } from 'ethers';
import { BigNumber } from 'bignumber.js';
import { IEvmBlock, IGetBlockByNumberConfig, IGetLatestBlockConfig } from '../interfaces';

export async function getLatestBlock(config: IGetLatestBlockConfig): Promise<string> {
  const { connection, format, verbose } = config;
  const printLogs = typeof verbose !== 'undefined' && verbose;

  if (printLogs) {
    console.log('[INFO] getLatestBlock - Starts');
  }

  try {
    const provider = typeof connection.method !== 'undefined'
      ? connection.method === 'http'
        ? new ethers.providers.JsonRpcProvider(connection.endpoint)
        : new ethers.providers.WebSocketProvider(connection.endpoint)
      : new ethers.providers.JsonRpcProvider(connection.endpoint);

    const latestBlock = await provider.getBlockNumber();

    if (printLogs) {
      console.log(`[INFO] getLatestBlock - Success: ${latestBlock.toString()}`);
    }

    return typeof format !== 'undefined' && format === 'dec'
      ? latestBlock.toString(10)
      : `0x${latestBlock.toString(16)}`;
  } catch (error: any) {
    if (printLogs) {
      console.log(`[ERROR] getLatestBlock - Failed: ${error}`);
    }

    throw error;
  }
}

// Always take in block number in decimal value
export async function getBlockByNumber(config: IGetBlockByNumberConfig): Promise<IEvmBlock> {
  const { connection, blockNumber, verbose } = config;
  const commonLog = `getBlockByNumber (${blockNumber}) -`;
  const printLogs = typeof verbose !== 'undefined' && verbose;
  const blockNumberInHex = `0x${new BigNumber(blockNumber).toString(16)}`;

  if (printLogs) {
    console.log(`[INFO] ${commonLog} Starts`);
  }

  try {
    const provider = typeof connection.method !== 'undefined'
      ? connection.method === 'http'
        ? new ethers.providers.JsonRpcProvider(connection.endpoint)
        : new ethers.providers.WebSocketProvider(connection.endpoint)
      : new ethers.providers.JsonRpcProvider(connection.endpoint);

    const rawBlock = await provider.getBlockWithTransactions(blockNumberInHex);

    const block: IEvmBlock = {
      hash: rawBlock.hash,
      parentHash: rawBlock.parentHash,
      number: `0x${rawBlock.number.toString(16)}`,
      timestamp: rawBlock.timestamp.toString(),
      gasLimit: rawBlock.gasLimit.toHexString(),
      transactions: rawBlock.transactions.map((tx) => ({
        hash: tx.hash,
        type: tx.type,
        blockHash: String(tx.blockHash),
        blockNumber: typeof tx.blockNumber !== 'undefined' ? `0x${tx.blockNumber.toString(16)}` : undefined,
        confirmations: tx.confirmations,
        from: tx.from,
        gasPrice: typeof tx.gasPrice !== 'undefined' ? tx.gasPrice.toHexString() : undefined,
        gasLimit: tx.gasLimit.toHexString(),
        to: tx.to,
        value: tx.value.toHexString(),
        nonce: tx.nonce,
        data: tx.data,
        chainId: tx.chainId,
      })),
    };

    if (printLogs) {
      console.log(`[INFO] ${commonLog} Success: This block contains ${block.transactions.length} transactions`);
      console.log(`[INFO] ${commonLog} Success: ${JSON.stringify(block)}`);
    }

    return block;
  } catch (error: any) {
    if (printLogs) {
      console.log(`[ERROR] ${commonLog} Failed: ${error}`);
    }

    throw error;
  }
}
