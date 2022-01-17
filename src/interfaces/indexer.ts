export type TNumericFormat = 'hex' | 'dec';

export interface IGetLatestBlockConfig {
  endpoint: string
  format?: TNumericFormat
  verbose?: boolean
}
