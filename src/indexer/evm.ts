/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { ethers } from 'ethers';
import { IGetLatestBlockConfig } from '../interfaces';

export async function getLatestBlock(config: IGetLatestBlockConfig) {
  const { endpoint, format, verbose } = config;
  const printLogs = typeof verbose !== 'undefined' && verbose;

  if (printLogs) {
    console.log('[Info] getLatestBlock - Starts');
  }

  try {
    const provider = new ethers.providers.JsonRpcProvider(endpoint);

    const latestBlock = await provider.getBlockNumber();

    if (printLogs) {
      console.log(`[Info] getLatestBlock - Respond from blockchain: ${latestBlock.toString()}`);
    }

    return typeof format !== 'undefined' && format === 'dec'
      ? latestBlock.toString(10)
      : `0x${latestBlock.toString(16)}`;
  } catch (error: any) {
    if (printLogs) {
      console.log(`[ERROR] getLatestBlock - Failed to get latest block number from blockchain: ${error}`);
    }

    throw error;
  }
}
