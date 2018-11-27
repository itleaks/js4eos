/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'unlock'
exports.desc = 'unlock wallet'
exports.builder = yargs => yargs
    .options("n", {
        alias:'name',
        desc:"wallet name",
        type:'string',
    })
    .options("p", {
        alias:'password',
        desc:"wallet password",
        type:'string',
    })
exports.handler = function (argv) {
    let name = argv.name
    if (!name) {
        name = 'default'
    }
    let passwd = argv.password
    if (!passwd) {
        var readline = require('readline-sync');
        passwd = readline.question("passwd> ", {
            hideEchoBack: true // The typed text on screen is hidden by `*` (default).
        });
    }
    Js4Eos.unlockWallet(name, passwd).then(ret => Js4Eos.printJson(ret));
}