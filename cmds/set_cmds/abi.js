/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'abi <account> <abifile>'
exports.desc = 'Create or update the contract on an account'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.setAbi(argv.account, argv.abifile).then(ret => Js4Eos.printTransaction(ret));
}