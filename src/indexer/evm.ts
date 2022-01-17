/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { ethers } from 'ethers';
import { BigNumber } from 'bignumber.js';
import { IGetBlockByNumberConfig, IGetLatestBlockConfig } from '../interfaces';

export async function getLatestBlock(config: IGetLatestBlockConfig) {
  const { connection, format, verbose } = config;
  const printLogs = typeof verbose !== 'undefined' && verbose;

  if (printLogs) {
    console.log('[INFO] getLatestBlock - Starts');
  }

  try {
    const provider = new ethers.providers.JsonRpcProvider(connection.endpoint);

    const latestBlock = await provider.getBlockNumber();

    if (printLogs) {
      console.log(`[INFO] getLatestBlock - Success: ${latestBlock.toString()}`);
    }

    return typeof format !== 'undefined' && format === 'dec'
      ? latestBlock.toString(10)
      : `0x${latestBlock.toString(16)}`;
  } catch (error: any) {
    if (printLogs) {
      console.log(`[ERROR] getLatestBlock - Failed: ${error}`);
    }

    throw error;
  }
}

// Always take in block number in decimal value
export async function getBlockByNumber(config: IGetBlockByNumberConfig) {
  const {
    connection, blockNumber, verbose,
  } = config;
  const commonLog = `getBlockByNumber (${blockNumber}) -`;
  const printLogs = typeof verbose !== 'undefined' && verbose;
  const blockNumberInHex = `0x${new BigNumber(blockNumber).toString(16)}`;

  if (printLogs) {
    console.log(`[INFO] ${commonLog} Starts`);
  }

  try {
    const provider = new ethers.providers.JsonRpcProvider(connection.endpoint);

    const block = await provider.getBlockWithTransactions(blockNumberInHex);

    if (printLogs) {
      console.log(`[INFO] ${commonLog} Success: This block contains ${block.transactions.length} transactions`);
      console.log(`[INFO] ${commonLog} Success: ${JSON.stringify(block)}`);
    }

    return block;
  } catch (error: any) {
    if (printLogs) {
      console.log(`[ERROR] ${commonLog} Failed: ${error}`);
    }

    throw error;
  }
}
