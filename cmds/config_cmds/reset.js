/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'reset'
exports.desc = 'reset configuration'
exports.builder = {}

exports.handler = function (argv) {
    Js4Eos.resetConfig().then(ret => Js4Eos.printJson(ret));
}