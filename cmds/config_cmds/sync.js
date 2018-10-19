/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'sync'
exports.desc = 'sync configuration file from network'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.syncConfig().then(ret => console.log(Js4Eos.getConfig()))
}