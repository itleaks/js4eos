/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')
const open = require('open')

exports.command = 'network'
exports.desc = 'show eos network'
exports.builder = {}
exports.handler = function (argv) {
    open("https://github.com/itleaks/js4eos/blob/master/networks.md");
}