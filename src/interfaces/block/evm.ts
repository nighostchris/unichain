export interface IEvmTransaction {
  hash: string,
  type?: number | null,
  blockHash?: string,
  blockNumber?: string,
  confirmations: number,
  from: string,
  gasPrice?: string,
  gasLimit: string,
  to?: string,
  value: string,
  nonce: number,
  data: string,
  chainId: number,
}

export interface IEvmBlock {
  hash: string
  parentHash: string
  number: string
  timestamp: string
  gasLimit: string
  transactions: IEvmTransaction[]
}
