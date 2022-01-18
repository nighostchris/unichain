import { IConnection } from './common';

export type TNumericFormat = 'hex' | 'dec';

export interface IGetLatestBlockConfig {
  connection: IConnection
  format?: TNumericFormat
  verbose?: boolean
}

export interface IGetBlockByNumberConfig {
  connection: IConnection
  blockNumber: string
  verbose?: boolean
}
