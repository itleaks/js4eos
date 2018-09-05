/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'abi <contract>'
exports.desc = ' Retrieve the ABI for an account'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.getAbi(argv.contract).then(ret => Js4Eos.printJson(ret));
}