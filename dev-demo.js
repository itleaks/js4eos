
/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

var Js4Eos = null
try {
    Js4Eos = require('js4eos')
} catch (e) {
    Js4Eos = require('./lib')
}

var initAccount = "js4eostest12"
var initAccountPrivateKey = "5KLTsZXQP6kba2tcah5jKfTeNrtcXozQqWDwx5YADrrDS38zK2R"

async function demo() {
    //default mainnet
    console.log("default EOS network")
    let ret = await Js4Eos.getInfo();
    Js4Eos.printJson(ret)

    //switch to jungle testnet
    console.log("switch to testnet")
    ret = await Js4Eos.getConfig();
    ret.chainId = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca';
    ret.httpEndpoint = 'http://193.93.219.219:8888';
    ret = await Js4Eos.getInfo();
    Js4Eos.printJson(ret)

    // creeate new account
    console.log("create new account")

    // create key for new account
    let key = await Js4Eos.createKey();
    Js4Eos.printJson(key)

    Js4Eos.importKey(initAccountPrivateKey)
    //Notice:please change 'youraccount'
    ret = await Js4Eos.newAccount(initAccount, "itleakstokee",
        key.publicKey, key.publicKey,
        "1.0000 EOS", "1.0000 EOS", null,
        4*1024, 1)
    Js4Eos.printJson(ret)
}

demo();

