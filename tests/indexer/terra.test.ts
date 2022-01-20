import { TerraIndexer } from '../../src';

// Terra Bombay 12 Testnet Explorer https://finder.terra.money/testnet/
// Testnet JSON-RPC Endpoint
const endpoint = 'https://bombay-lcd.terra.dev';
const chainId = 'bombay-12';

describe('[LUNA Indexer]', () => {
  test(`getLatestBlock() + getBlockByNumber()`, async () => {
    const blockNumber = await TerraIndexer.getLatestBlock({
      connection: { endpoint, chainId },
    });

    expect(typeof blockNumber).not.toBe('undefined');

    const blockNumberWithVerbose = await TerraIndexer.getLatestBlock({
      connection: { endpoint, chainId },
      verbose: true,
    });

    expect(typeof blockNumberWithVerbose).not.toBe('undefined');

    const block = await TerraIndexer.getBlockByNumber({
      connection: { endpoint, chainId },
      blockNumber,
      verbose: true,
    });

    expect(typeof block).not.toBe('undefined');
    expect(block.number).toBe(blockNumber);
  });
});