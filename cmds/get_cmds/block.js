/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'block <height>'
exports.desc = 'get one block info'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.getBlock(argv.height).then(ret => Js4Eos.printJson(ret));
}