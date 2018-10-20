/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'create'
exports.desc = 'create default wallet'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.createWallet().then(ret => Js4Eos.printJson(ret));
}