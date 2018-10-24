/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'account <creator> <name> <ownerkey> [activekey]'
exports.desc = 'Create an account, buy ram, stake for bandwidth for the account'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.createAccount(argv.creator, argv.name, argv.ownerkey, argv.activekey?argv.activekey:argv.ownerkey).then(ret => Js4Eos.printTransaction(ret));
}