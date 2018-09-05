/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'action <contract> <action> <data>'
exports.desc = 'Push a transaction with a single action'
exports.builder = yargs => yargs
.options("p", {
    alias:"permission",
    desc:"An account and permission level to authorize, as in 'account@permission'",
    type:'string',
    default:false,
})
exports.handler = function (argv) {
    Js4Eos.pushRawAction(argv.contract, argv.action, argv.data, argv.p).then(ret => Js4Eos.printJson(ret));
}