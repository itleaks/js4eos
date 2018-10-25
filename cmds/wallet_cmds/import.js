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
exports.handler = function (argv) {
    let name = argv.name
    if (!name) {
        name = 'default'
    }
    Js4Eos.importKey(name, argv.key).then(ret => {
        if (ret) {
            console.log("import success:", argv.key)
        }
    });
}