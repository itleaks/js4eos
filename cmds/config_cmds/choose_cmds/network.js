/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../../lib')

exports.command = 'network'
exports.desc = 'choose network'
exports.builder = {}

async function process(argv) {
    let config = Js4Eos.getConfig()

    console.log("Choose one network:")
    let i = 0;
    let networks = []
    for(let network in config.networks) {
        if (network == config.currentNetwork) {
            console.log("\t*[" + i + "] " + network)
        } else {
            console.log("\t [" + i + "] " + network)
        }
        networks.push(network)
        i++
    }
    var readline = require('readline-sync');
    var input = readline.question("please input[0~" + (networks.length-1) + "]> ");
    try {
        let index = parseInt(input)
        if ((!index && index != 0) || index < 0 || index > i-1) {
            console.log("index must be 0~" + i)
            return;
        }
        config.currentNetwork = networks[index]
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