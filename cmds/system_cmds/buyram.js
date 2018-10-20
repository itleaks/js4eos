/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'buyram <payer> <receiver> <tokens>'
exports.desc = 'Buy RAM'
exports.builder = {}
exports.handler = function (argv) {
    // console.log(argv);
    Js4Eos.buyRam(
        argv.payer,
        argv.receiver,
        argv.tokens,
    ).then(ret => Js4Eos.printTransaction(ret));
}