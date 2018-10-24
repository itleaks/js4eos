/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'list'
exports.desc = 'list wallet'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.listWallet().then(ret => Js4Eos.printJson(ret));
}