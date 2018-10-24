/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'create_key'
exports.desc = 'create a key within wallet'
exports.builder = yargs => yargs
    .options("n", {
        alias:'name',
        desc:"wallet name",
        type:'string',
    })
exports.handler = function (argv) {
    let name = argv.name
    if (!name) {
        name = 'default'
    }
    Js4Eos.createKeyInWallet(name).then(ret => Js4Eos.printJson(ret));
}