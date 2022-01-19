/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { LCDClient } from '@terra-money/terra.js';

import { IGetLatestBlockConfig } from '../interfaces';

export async function getLatestBlock(config: IGetLatestBlockConfig): Promise<string> {
  const { connection, verbose } = config;
  const printLogs = typeof verbose !== 'undefined' && verbose;

  if (printLogs) {
    console.log('[INFO] getLatestBlock - Starts');
  }

  try {
    const lcdClient = new LCDClient({
      URL: connection.endpoint,
      chainID: String(connection.chainId),
    });

    const latestBlock = (await lcdClient.tendermint.blockInfo()).block.header.height;

    if (printLogs) {
      console.log(`[INFO] getLatestBlock - Success: ${latestBlock}`);
    }

    return latestBlock;
  } catch (error: any) {
    if (printLogs) {
      console.log(`[ERROR] getLatestBlock - Failed: ${error}`);
    }

    throw error;
  }
}
