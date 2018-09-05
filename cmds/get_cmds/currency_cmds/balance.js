/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../../lib')

exports.command = 'balance <contract> <account> [symbol]'
exports.desc = 'Retrieve the balance of an account for a given currency'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.getCurrencyBalance(argv.contract, argv.account, argv.symbol).then(ret => Js4Eos.printJson(ret));
}