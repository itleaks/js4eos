/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
*/

const Js4Eos = require('../../lib')

exports.command = 'newaccount <creator> <name> <owner_key> [active_key]'
exports.desc = 'Create an account, buy ram, stake for bandwidth for the account'
exports.builder = yargs => yargs
.options("stake-net", {
    desc:"The amount of EOS delegated for net bandwidth (required)",
    type:'string',
    demand: true,
})
.options("stake-cpu", {
    desc:"The amount of EOS delegated for cpu bandwidth (required)",
    type:'string',
    demand: true,
})
.options("buy-ram-kbytes", {
    desc:"The amount of RAM bytes to purchase for the new account in kibibytes (KiB), default is 8 KiB",
    type:'int',
})
.options("buy-ram", {
    desc:"The amount of RAM bytes to purchase for the new account in EOS",
    type:'string',
})
.options("transfer", {
    desc:"Transfer voting power and right to unstake EOS to receiver",
    type:'bool',
    default:false,
})
// .options("p", {
//     alias:"permission",
//     desc:"An account and permission level to authorize, as in 'account@permission'",
//     type:'string',
//     default:false,
// })
exports.handler = function (argv) {
    // console.log(argv);
    Js4Eos.newAccount(
        argv.creator,
        argv.name,
        argv.owner_key,
        argv.active_key ? argv.active_key : argv.owner_key,
        argv.stakeNet,
        argv.stakeCpu,
        argv.buyRam,
        argv.buyRamKbytes*1000,
        argv.transfer ? 1:0
    ).then(ret => Js4Eos.printJson(ret));
}