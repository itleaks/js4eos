/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

var patch_api = require('./patch_api')
var Config = require('./config').getConfig();
var Wallet = require('./wallet');

Eos = patch_api(require('eosjs'))

// Private key or keys (array) provided statically or by way of a function.
// For multiple keys, the get_required_keys API is used (more on that below).
eos = Eos({httpEndpoint:Config.httpEndpoint, chainId:Config.chainId, keyProvider:() => Wallet.getPrivateKeysSync()})

exports.EOS = eos
