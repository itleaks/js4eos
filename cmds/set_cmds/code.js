/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'code <account> <wasmfile>'
exports.desc = 'Create or update the contract on an account'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.setCode(argv.account, argv.wasmfile).then(ret => Js4Eos.printTransaction(ret));
}