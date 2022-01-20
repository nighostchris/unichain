import { EvmFilter, EvmIndexer } from '../../src';

const evmEndpoint = 'https://api.avax-test.network/ext/bc/C/rpc';

describe('[EVM Filter]', () => {
  test('[AVAX] filterTransaction() - #5012518 ERC-20', async () => {
    const block = await EvmIndexer.getBlockByNumber({
      connection: { endpoint: evmEndpoint },
      blockNumber: '5012518',
      verbose: true,
    });

    const filteredTx = await EvmFilter.filterTransaction({
      blockchain: 'AVAX',
      transaction: block.transactions[0],
      connection: { endpoint: evmEndpoint },
      trackedAddresses: ['0xfb89b915a6245391ad09bc7ffdce90f67d7f1f24']
    });

    // https://testnet.snowtrace.io/tx/0xa1a80ab96c5f4036fd08240dfe1b47382aa1ec9794a42c30b6829e8c76a62c43
    expect(typeof filteredTx !== 'undefined');
    expect(filteredTx[0].blockNumber).toBe('5012518');
    expect(filteredTx[0].hash).toBe('0xa1a80ab96c5f4036fd08240dfe1b47382aa1ec9794a42c30b6829e8c76a62c43');
    expect(filteredTx[0].origin).toBe('0x6b0d921d52c7a940104748e1867bEfe5f2105028');
    expect(filteredTx[0].destination).toBe('0xFb89b915A6245391aD09Bc7fFdcE90f67d7f1F24');
    expect(filteredTx[0].contract).toBe('0x6271Ca63D30507f2Dcbf99B52787032506D75BBF');
    expect(filteredTx[0].type).toBe('payment');
    expect(filteredTx[1].origin).toBe('0xd52f9EC96996E33fc705670A63B2e0a34FE91AA2');
    expect(filteredTx[1].value).toBe('0.022453275');
    expect(filteredTx[1].type).toBe('fee');
  });
});
