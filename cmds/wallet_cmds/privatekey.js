/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'private_keys'
exports.desc = 'list keys'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.getPrivateKeys().then(ret => Js4Eos.printJson(ret));
}