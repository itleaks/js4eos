/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'transaction <trxid> <block_num_hint>'
exports.desc = 'Retrieve a transaction from the blockchain'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.getTransaction(argv.trxid, argv.block_num_hint).then(ret => Js4Eos.printJson(ret));
}