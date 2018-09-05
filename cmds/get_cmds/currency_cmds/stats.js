/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../../lib')

exports.command = 'stats <contract> <symbol>'
exports.desc = 'Retrieve the stats of for a given currency'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.getCurrencyStats(argv.contract, argv.symbol).then(ret => Js4Eos.printJson(ret));
}