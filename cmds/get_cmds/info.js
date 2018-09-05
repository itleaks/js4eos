/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'info'
exports.desc = 'get blockchain info'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.getInfo().then(ret => Js4Eos.printJson(ret));
}