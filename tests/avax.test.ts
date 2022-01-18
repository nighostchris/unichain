import BigNumber from 'bignumber.js';

import { EvmIndexer } from '../src';

// Avalanche Fuji Testnet Explorer
// https://testnet.snowtrace.io
// Avalanche Fuji Testnet RPC Endpoint
const endpoint = 'https://api.avax-test.network/ext/bc/C/rpc';

describe('[Avalanche]', () => {
  test('getLatestBlock() + getBlockByNumber()', async () => {
    const blockNumber = await EvmIndexer.getLatestBlock({
      connection: { endpoint },
    });

    expect(typeof blockNumber).not.toBe('undefined');
    expect(blockNumber.includes('0x')).toBeTruthy();

    const blockNumberInDec = await EvmIndexer.getLatestBlock({
      connection: { endpoint },
      format: 'dec',
    });

    expect(typeof blockNumberInDec).not.toBe('undefined');
    expect(blockNumberInDec.includes('0x')).toBeFalsy();

    const blockNumberWithVerbose = await EvmIndexer.getLatestBlock({
      connection: { endpoint },
      verbose: true,
    });

    expect(typeof blockNumberWithVerbose).not.toBe('undefined');

    const block = await EvmIndexer.getBlockByNumber({
      connection: { endpoint },
      blockNumber: blockNumberInDec,
      verbose: true,
    });

    expect(typeof block).not.toBe('undefined');
    expect(String(block.number)).toBe(`0x${new BigNumber(blockNumberInDec).toString(16)}`);
  });
});
