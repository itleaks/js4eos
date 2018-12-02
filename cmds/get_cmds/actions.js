/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'actions <account> [pos] [offset]'
exports.desc = ' get action history of a account'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.getActions(argv.account, argv.pos, argv.offset).then(ret => {
        if (ret) {
            Js4Eos.printTransactions(ret.actions)
        } else {
            console.log("No datas")
        }
    });
}