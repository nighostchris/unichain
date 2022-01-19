import BigNumber from 'bignumber.js';

import { EvmIndexer, IConnection, TBlockchain } from '../../src';

// Ethereum Ropsten Testnet Explorer https://ropsten.etherscan.io
// Testnet JSON-RPC Endpoint
const ethEndpoint = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

// Avalanche Fuji Testnet Explorer https://testnet.snowtrace.io
// Testnet JSON-RPC Endpoint
const avaxEndpoint = 'https://api.avax-test.network/ext/bc/C/rpc';

// Celo Alfajores Testnet Explorer https://alfajores-blockscout.celo-testnet.org
// Testnet JSON-RPC Endpoint
// const celoEndpoint = 'https://alfajores-forno.celo-testnet.org';
// Testnet Websocket Endpoint
// const celoWsEndpoint = 'wss://alfajores-forno.celo-testnet.org/ws';

// Polygon Mumbai Testnet Explorer https://mumbai.polygonscan.com
// Testnet JSON-RPC Endpoint
const maticEndpoint = 'https://rpc-mumbai.maticvigil.com';
// Testnet Websocket Endpoint
const maticWsEndpoint = 'wss://rpc-mumbai.matic.today';

// Harmony Testnet Explorer https://explorer.testnet.harmony.one
// Testnet Websocket Endpoint
// const oneWsEndpoint = 'ws://ws.s0.pga.hmny.io';

async function testIndexerFunctions(blockchain: TBlockchain, connection: IConnection) {
  test(`[${blockchain}] getLatestBlock() + getBlockByNumber()`, async () => {
    const blockNumber = await EvmIndexer.getLatestBlock({
      connection,
    });

    expect(typeof blockNumber).not.toBe('undefined');
    expect(blockNumber.includes('0x')).toBeTruthy();

    const blockNumberInDec = await EvmIndexer.getLatestBlock({
      connection,
      format: 'dec',
    });

    expect(typeof blockNumberInDec).not.toBe('undefined');
    expect(blockNumberInDec.includes('0x')).toBeFalsy();

    const blockNumberWithVerbose = await EvmIndexer.getLatestBlock({
      connection,
      verbose: true,
    });

    expect(typeof blockNumberWithVerbose).not.toBe('undefined');

    const block = await EvmIndexer.getBlockByNumber({
      connection,
      blockNumber: blockNumberInDec,
      verbose: true,
    });

    expect(typeof block).not.toBe('undefined');
    expect(String(block.number)).toBe(`0x${new BigNumber(blockNumberInDec).toString(16)}`);
  });
}

describe('[EVM Indexer]', () => {
  testIndexerFunctions('AVAX', { endpoint: avaxEndpoint });
  testIndexerFunctions('ETH', { endpoint: ethEndpoint });
  testIndexerFunctions('MATIC', { endpoint: maticEndpoint });
});
