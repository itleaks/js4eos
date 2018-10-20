/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'unlock'
exports.desc = 'unlock wallet'
exports.builder = {}
exports.handler = function (argv) {
    var readline = require('readline-sync');
    var passwd = readline.question("passwd> ", {
        hideEchoBack: true // The typed text on screen is hidden by `*` (default).
    });
    Js4Eos.unlockWallet(passwd).then(ret => Js4Eos.printJson(ret));
}