/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { LCDClient } from '@terra-money/terra.js';

import { ILunaBlock, IGetBlockByNumberConfig, IGetLatestBlockConfig } from '../interfaces';

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

export async function getBlockByNumber(config: IGetBlockByNumberConfig): Promise<ILunaBlock> {
  const { connection, blockNumber, verbose } = config;
  const commonLog = `getBlockByNumber (${blockNumber}) -`;
  const printLogs = typeof verbose !== 'undefined' && verbose;

  if (printLogs) {
    console.log(`[INFO] ${commonLog} Starts`);
  }

  try {
    const lcdClient = new LCDClient({
      URL: connection.endpoint,
      chainID: String(connection.chainId),
    });

    const { block, block_id } = await lcdClient.tendermint.blockInfo(parseInt(blockNumber, 10));

    const resultBlock = {
      hash: block_id.hash,
      parentHash: block.last_commit.block_id.hash,
      number: block.header.height,
      chainId: block.header.chain_id,
      timestamp: new Date(block.header.time).valueOf().toString(),
      transactions: block.data.txs === null ? [] : block.data.txs,
    };

    if (printLogs) {
      console.log(`[INFO] ${commonLog} Success: This block contains `
        + `${block.data.txs !== null ? block.data.txs.length : 0} transactions`);
      console.log(`[INFO] ${commonLog} Success: ${JSON.stringify(resultBlock)}`);
    }

    return resultBlock;
  } catch (error: any) {
    if (printLogs) {
      console.log(`[ERROR] ${commonLog} Failed: ${error}`);
    }

    throw error;
  }
}
