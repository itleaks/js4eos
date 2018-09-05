/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'account <name>'
exports.desc = 'Create an empty repo'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.getAccount(argv.name).then(ret => Js4Eos.printJson(ret));
}