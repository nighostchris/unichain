import { EvmIndexer } from '../src';

// Avalanche Fuji Testnet Explorer
// https://testnet.snowtrace.io
// Avalanche Fuji Testnet RPC Endpoint
const endpoint = 'https://api.avax-test.network/ext/bc/C/rpc';

describe('[Avalanche]', () => {
  test('getLatestBlock()', async () => {
    const blockNumber = await EvmIndexer.getLatestBlock({
      endpoint,
    });

    expect(typeof blockNumber).not.toBe('undefined');
    expect(blockNumber.includes('0x')).toBeTruthy();

    const blockNumberInDec = await EvmIndexer.getLatestBlock({
      endpoint,
      format: 'dec',
    });

    expect(typeof blockNumberInDec).not.toBe('undefined');
    expect(blockNumberInDec.includes('0x')).toBeFalsy();

    const blockNumberWithVerbose = await EvmIndexer.getLatestBlock({
      endpoint,
      verbose: true,
    });

    expect(typeof blockNumberWithVerbose).not.toBe('undefined');
  });
});

