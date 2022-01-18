/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { ethers, BigNumber as ethersBigNumber } from 'ethers';

// import { IFilterEvmTransactionParams } from '../interfaces';
import { ERC20_TRANSFER_ABI } from '../constants';

export function decodeErc20Data(data: string): { to: string, value: any } {
  const erc20Interface = new ethers.utils.Interface([ERC20_TRANSFER_ABI]);

  const decodedFields = erc20Interface.parseTransaction({ data });

  return {
    to: decodedFields.args[0],
    value: ethersBigNumber.from(decodedFields.args[1]).toString(),
  };
}

// export async function filterEvmTransaction(params: IFilterEvmTransactionParams): Promise<any> {
//   const {
//     transaction, trackedAddresses, contracts, connection,
//   } = params;
//   const trackedAddressesHashmap: { [address: string]: boolean } = {};

//   for (const addr of trackedAddresses) {
//     trackedAddressesHashmap[addr.toLowerCase()] = true;
//   }

//   const provider = new ethers.providers.JsonRpcProvider(connection.endpoint);

//   const receipt = await provider.getTransactionReceipt(transaction.hash);

//   // Non-native token transfer filtering
//   if (receipt.logs.length) {
//     for (const log of receipt.logs) {
//       // ERC-20 token transfer transaction
//       if (Array.isArray(log) && log.topics.includes(TRANSFER_TOPIC)) {
//         const decodedData = decodeErc20Data(transaction.data)
//       }
//     }
//   }

//   // Native token transfer filtering
//   if (transaction.value !== '0x00'
//     && trackedAddressesHashmap[transaction.from.toLowerCase()]) {
//   // && trackedAddressesHashmap[transaction.to?.toLowerCase()]) {
//     console.log('[INFO] filterEvmTransaction - Found native token transaction');
//   }
// }
