/* eslint-disable no-restricted-syntax */
import BigNumber from 'bignumber.js';
import { Event } from '@terra-money/terra.js';

import { TERRA_MINIMUM_UNIT } from '../constants';
import { IFilterTerraTransactionParams, IFilterTransaction, ITerraTransaction } from '../interfaces';

export function processTransferEvent(
  transaction: ITerraTransaction,
  event: Event,
  logHead?: string,
): IFilterTransaction[] {
  const filteredTransactions: IFilterTransaction[] = [];

  const commonFields = {
    blockNumber: transaction.height.toString(10),
    hash: transaction.txhash,
    blockchain: 'LUNA',
  };

  // Payment
  filteredTransactions.push({
    ...commonFields,
    origin: event.attributes[1].value,
    destination: event.attributes[0].value,
    value: new BigNumber(event.attributes[2].value.replaceAll(/[^0-9.]/g, ''))
      .dividedBy(TERRA_MINIMUM_UNIT)
      .toString(10),
    type: 'payment',
    memo: typeof transaction.tx.body.memo !== 'undefined' ? transaction.tx.body.memo : '',
  });

  const feePayer = transaction.tx.auth_info.fee.payer;
  // Fee
  filteredTransactions.push({
    ...commonFields,
    origin: typeof feePayer !== 'undefined' && feePayer !== ''
      ? feePayer
      : event.attributes[1].value,
    destination: '',
    value: new BigNumber(transaction.tx.auth_info.fee.amount.toString().replaceAll(/[^0-9.]/g, ''))
      .dividedBy(TERRA_MINIMUM_UNIT)
      .toString(10),
    type: 'fee',
    memo: '',
  });

  console.log(typeof logHead !== 'undefined'
    ? `${logHead} ${JSON.stringify(filteredTransactions)}`
    : `processTransferEvent - ${JSON.stringify(filteredTransactions)}`);

  return filteredTransactions;
}

/* eslint-disable import/prefer-default-export */
export function filterTransaction(params: IFilterTerraTransactionParams): IFilterTransaction[] {
  const { transaction, trackedAddresses } = params;

  const transactions: IFilterTransaction[] = [];
  const trackedAddressesHashmap: { [address: string]: boolean } = {};
  const commonLog = `filterTransaction (LUNA:${transaction.txhash}) -`;

  for (const addr of trackedAddresses) {
    trackedAddressesHashmap[addr.toLowerCase()] = true;
  }

  console.log(`${commonLog} Starts`);

  if (typeof transaction.logs !== 'undefined') {
    for (const log of transaction.logs) {
      for (const event of log.events) {
        switch (event.type) {
          case 'transfer':
            processTransferEvent(
              transaction,
              event,
              `[INFO] ${commonLog} Found transaction:`,
            );
            break;
          default:
            break;
        }
      }
    }
  }

  return transactions;
}
