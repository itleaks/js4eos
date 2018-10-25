/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'import <key>'
exports.desc = 'Import private key into wallet'
exports.builder = yargs => yargs
    .options("n", {
        alias:'name',
        desc:"wallet name",
        type:'string',
    })

async function process(argv) {
    let name = argv.name
    if (!name) {
        name = 'default'
    }
    let ret = await Js4Eos.importKey(name, argv.key)
    if (ret) {
        let pubkey = await Js4Eos.privateToPublic(argv.key);
        console.log("Import success:", pubkey);
    }
}

exports.handler = function (argv) {
    process(argv)
}