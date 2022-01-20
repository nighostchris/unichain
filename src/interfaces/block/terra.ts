import { TxInfo } from '@terra-money/terra.js';

export interface ITerraTransaction extends TxInfo {}

export interface ITerraBlock {
  hash: string,
  parentHash: string,
  number: string,
  timestamp: string,
  chainId: string,
  transactions: ITerraTransaction[],
}
