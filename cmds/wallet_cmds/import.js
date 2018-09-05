/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'import <key>'
exports.desc = 'Import private key into wallet'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.importKey(argv.key).then(ret => Js4Eos.printJson(ret));
}