/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
*/

const Js4Eos = require('../../lib')

exports.command = 'undelegatebw <from> <receiver> <stake_net_quantity> <stake_cpu_quantity>'
exports.desc = 'UnDelegate bandwidth'
exports.builder = yargs => yargs
.options("p", {
    alias:"permission",
    desc:"An account and permission level to authorize, as in 'account@permission'",
    type:'string',
    default:false,
})
exports.handler = function (argv) {
    Js4Eos.undelegatebw(argv.from, argv.receiver,
        argv.stake_net_quantity,
        argv.stake_cpu_quantity,
        argv.permission
    ).then(ret => Js4Eos.printTransaction(ret));
}