/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'exchange <contract> <account> <quantity>'
exports.desc = 'exchange'
exports.builder = {}
exports.handler = function (argv) {
    // console.log(argv);
    Js4Eos.exchange(
        argv.contract,
        argv.account,
        argv.quantity,
    ).then(ret => Js4Eos.printJson(ret));
}