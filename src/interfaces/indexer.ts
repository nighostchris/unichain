import { IConnection } from './common';
import { TNumericFormat } from './type';

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
