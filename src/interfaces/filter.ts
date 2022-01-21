import { BaseProvider } from '@ethersproject/providers';

import { IConnection } from './common';
import { IEvmBlock } from './block/evm';
import { ITerraBlock } from './block/terra';
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
  block: IEvmBlock
  blockchain: TBlockchain
  provider?: BaseProvider
  connection?: IConnection
}

export interface IFilterTerraTransactionParams extends IFilterTransactionParams {
  block: ITerraBlock
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
  ticker?: string // For blockchains with multiple native tokens only
}
