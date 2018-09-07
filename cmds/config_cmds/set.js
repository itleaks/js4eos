/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'set'
exports.desc = 'set configurtion, such as chainid, httpEndpoint'
exports.builder = yargs => yargs
    .options("c", {
        alias:'chainid',
        desc:"network chainid",
        type:'string',
    })
    .options("p", {
        alias:'keyprefix',
        desc:"public key prefix",
        type:'string',
    })
    .options("u", {
        alias:'url',
        desc:"network endpoint",
        type:'string',
    })

exports.handler = function (argv) {
    let config = Js4Eos.getConfig();
    if (argv.chainid) {
        config.chainId = argv.chainid;
    }
    if (argv.url) {
        config.httpEndpoint = argv.url;
    }

    if (argv.keyprefix) {
        config.keyPrefix = argv.keyprefix;
    }
    // Js4Eos.printJson(config)
    Js4Eos.saveConfig(config)
    Js4Eos.printJson(config)
}