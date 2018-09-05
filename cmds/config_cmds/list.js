/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'list'
exports.desc = 'show system current configuration, such as httpEndpoint, Chainid'
exports.builder = {}
exports.handler = function (argv) {
    let config = Js4Eos.getConfig();
    Js4Eos.printJson(config)
}