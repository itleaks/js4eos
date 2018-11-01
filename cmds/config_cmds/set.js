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
    .options("n", {
        alias:'network',
        desc:"network name",
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
    let network = argv.network
    if (!network) {
        //Do nothing
    } else if (network in config.networks) {
        config.currentNetwork = network
    } else {
        console.log("network " + network + " not exist")
        return;
    }
    if (argv.chainid) {
        config.networks[config.currentNetwork].chainId = argv.chainid;
    }
    if (argv.url) {
        let httpEndpoints = config.networks[config.currentNetwork].httpEndpoints
        if (!httpEndpoints) {
            httpEndpoints = []
        }
        config.networks[config.currentNetwork].httpEndpoint = argv.url;
        if (httpEndpoints.indexOf(argv.url) == -1) {
            httpEndpoints.push(argv.url)
            config.networks[config.currentNetwork].httpEndpoints = httpEndpoints
        }
    }

    if (argv.keyprefix) {
        config.networks[config.currentNetwork].keyPrefix = argv.keyprefix;
    }
    // Js4Eos.printJson(config)
    Js4Eos.saveConfig(config)
    Js4Eos.printJson(config)
}