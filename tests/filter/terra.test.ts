import { TerraFilter, TerraIndexer } from '../../src';

const endpoint = 'https://bombay-lcd.terra.dev';
const chainId = 'bombay-12';

describe('[LUNA Filter]', () => {
  // https://finder.terra.money/testnet/tx/D95A07908BBB2B4A52CFF1FB4F983A18295BF28168E1EF24435395C638EAC330
  test('filterTransaction() - #7453514 LUNA Transfer', async () => {
    const block = await TerraIndexer.getBlockByNumber({
      connection: { endpoint, chainId },
      blockNumber: '7453514',
      verbose: true,
    });

    const filteredTx = await TerraFilter.filterTransaction({
      block,
      trackedAddresses: ['terra1z90twxf7tw7p4guwxwmy9pg0m9c4fuw4kgz673']
    });

    expect(typeof filteredTx !== 'undefined');
  });

  test('filterTransaction() - #7459252 AUT Transfer', async () => {
    const block = await TerraIndexer.getBlockByNumber({
      connection: { endpoint, chainId },
      blockNumber: '7459252',
      verbose: true,
    });

    const filteredTx = await TerraFilter.filterTransaction({
      block,
      trackedAddresses: ['terra1z90twxf7tw7p4guwxwmy9pg0m9c4fuw4kgz673']
    });

    expect(typeof filteredTx !== 'undefined');
  });
});
