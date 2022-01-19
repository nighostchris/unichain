import { TConnectionMethod } from './type';

export interface IConnection {
  endpoint: string
  username?: string
  password?: string
  chainId?: string
  method?: TConnectionMethod
}
