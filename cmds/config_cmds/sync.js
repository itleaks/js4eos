/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'sync'
exports.desc = 'sync configuration file from network'
exports.builder = {}

async function process(argv) {
    let oldNetwork = Js4Eos.getConfig().currentNetwork
    let config = await Js4Eos.syncConfig()
    if (!config) {
        console.log("sync fail")
        return;
    }
    config.currentNetwork = oldNetwork
    Js4Eos.saveConfig(config)
    Js4Eos.printJson(config)
}

exports.handler = function (argv) {
    process(argv)
}