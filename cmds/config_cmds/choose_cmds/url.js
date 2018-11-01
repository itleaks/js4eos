/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../../lib')

exports.command = 'url'
exports.desc = 'choose httpEndpoint'
exports.builder = {}

async function process(argv) {
    let config = Js4Eos.getConfig()
    let network = config.networks[config.currentNetwork]
    let endpoints = []
    if (network.httpEndpoints) {
        for (let endpoint of network.httpEndpoints) {
            endpoints.push(endpoint)
        }
    }
    if (endpoints.indexOf(network.httpEndpoint) == -1) {
        endpoints.push(network.httpEndpoint)
    }

    console.log("Choose one httpEndpoint for " + config.currentNetwork + ":")
    for(let i in endpoints) {
        let endpoint = endpoints[i]
        if (endpoint == network.httpEndpoint) {
            console.log("\t*[" + i + "] " + endpoint)
        } else {
            console.log("\t [" + i + "] " + endpoint)
        }
    }
    var readline = require('readline-sync');
    var input = readline.question("please input[0~" + (endpoints.length-1) + "]> ");
    try {
        let index = parseInt(input)
        if (index < 0 || index > endpoints.length-1) {
            console.log("index must be 0~" + (endpoints.length))
            return;
        }
        config.networks[config.currentNetwork].httpEndpoint = endpoints[index]
        Js4Eos.saveConfig(config)
        Js4Eos.printJson(config)
    } catch(e) {
        console.log(e)
        console.log("Invalid input")
    }
}

exports.handler = function (argv) {
    process(argv)
}