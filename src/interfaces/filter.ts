import { IConnection } from './common';
import { IEvmTransaction } from './block/evm';

export interface IEvmContracts {
  [address: string]: {
    ticker: string
  }
}

export interface IFilterEvmTransactionParams {
  transaction: IEvmTransaction
  trackedAddresses: string[]
  contracts: IEvmContracts
  connection: IConnection
}
