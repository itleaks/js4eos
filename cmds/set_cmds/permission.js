/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'account permission <account> <permission> <authority> [parent]'
exports.desc = 'set permission'
exports.builder = {}
exports.handler = function (argv) {
    console.log(argv.account)
    console.log(argv.permission)

    if (argv.permission != 'active') {
        console.log('only support update active permission')
        return;
    }
    let parent = argv.parent ? argv.parent : 'active'
    Js4Eos.setPermission(argv.account, argv.permission, argv.authority, parent).then(ret => Js4Eos.printTransaction(ret));
}