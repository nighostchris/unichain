import { IConnection } from './common';
import { IEvmTransaction } from './block/evm';
import { ITerraTransaction } from './block/terra';
import { TBlockchain, TTransactionType } from './type';

export interface IErc20Event {
  from: string
  to: string
  value: string
}

export interface IFilterTransactionParams {
  trackedAddresses: string[]
}

export interface IFilterEvmTransactionParams extends IFilterTransactionParams {
  blockchain: TBlockchain
  connection: IConnection
  transaction: IEvmTransaction
}

export interface IFilterTerraTransactionParams extends IFilterTransactionParams {
  transaction: ITerraTransaction
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
