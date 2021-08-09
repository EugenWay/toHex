// Import
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {

    const data = {
        kind: "i32",
        value: "10"
    }

    // Construct
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });

    toHex(data, api);
}

function toHex (data, api) {

    let res;

    if (data.kind === 'i32') {
        res = api.createType('Bytes', Array.from(api.createType('i32', data.value).toU8a()));
    }
    
    console.log(res.toHex());
}


main();