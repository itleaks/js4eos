/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')
const open = require('open')

exports.command = 'guild'
exports.desc = 'Getting Started Guild | Js4eos'
exports.builder = {}
exports.handler = function (argv) {
    open("https://github.com/itleaks/js4eos/blob/master/README.md");
}