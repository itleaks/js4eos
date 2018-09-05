/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'key'
exports.desc = 'Create a new keypair and print the public and private keys'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.createKey(argv.key).then(ret => Js4Eos.printJson(ret));
}