import { IConnection } from './common';
import { IEvmTransaction } from './block/evm';
import { TBlockchain, TTransactionType } from './type';

export interface IErc20Event {
  from: string
  to: string
  value: string
}

export interface IFilterEvmTransactionParams {
  blockchain: TBlockchain
  connection: IConnection
  trackedAddresses: string[]
  transaction: IEvmTransaction
}

export interface IFilterTransaction {
  blockNumber: string
  hash: string
  origin: string
  destination: string
  contract?: string
  value: string
  type: TTransactionType
  memo: string
  blockchain: string
}
