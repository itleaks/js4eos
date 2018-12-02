/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'accounts <pubkey>'
exports.desc = ' get accounts from public key'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.getAccounts(argv.pubkey).then(ret => Js4Eos.printJson(ret));
}