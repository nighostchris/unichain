export type TNumericFormat = 'hex' | 'dec';

export interface IConnection {
  endpoint: string
  username?: string
  password?: string
}

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
