/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
*/

const Js4Eos = require('../../lib')

exports.command = 'sellram <accountr> <bytes>'
exports.desc = 'Sell RAM'
exports.builder = {}
exports.handler = function (argv) {
    // console.log(argv);
    Js4Eos.sellRam(
        argv.accountr,
        argv.bytes,
    ).then(ret => Js4Eos.printJson(ret));
}