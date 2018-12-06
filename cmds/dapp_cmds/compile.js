/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

var Js4Eos = require('../../index')
const path = require('path')
const fs  = require('fs')

exports.command = 'compile <contract>'
exports.desc = 'compile a contract'
exports.builder = {}

async function compile(argv) {
    try {
        var currentDir = process.cwd()
        var configFile = path.join(currentDir, "js4eos_config.js")
        if (!fs.existsSync(configFile)) {
            console.log("No config file js4eos_config.js")
            return;
        }
        let config = require(configFile)
        var network = argv.network
        if (!network) {
            network = config.defaultNetwork
        }

        let contractDir = path.join("./contracts", argv.contract)
        let sourceFile = path.join(contractDir, argv.contract + ".cpp");
        if (!fs.existsSync(sourceFile)) {
            console.log("contract source file " + sourceFile + " not exist")
            return;
        }
        let contractAccount = config.deploy[argv.contract][network]
        if (!contractAccount) {
            console.log("No contract account, please set in js4eos_config.js")
            return;
        }
        let wasmFile = path.join(contractDir, argv.contract + ".wasm");
        let abiFile = path.join(contractDir, argv.contract + ".abi");
        Js4Eos = Js4Eos({
            network:config.networks[network],
            keyProvider:config.keyProvider
        })
        if (!config.eosio_cdt) {
            console.log("Compile wasm for", sourceFile)
            let ret = await Js4Eos.compile(sourceFile, wasmFile, {flag:'o'})
            if (ret) {
                console.log(ret.stderr, ret.stdout)
            }
            console.log("Generated abi for", sourceFile)
            ret = await Js4Eos.compile(sourceFile, abiFile, {flag:'g'})
            if (ret) {
                console.log(ret.stderr, ret.stdout)
            }
        } else {
            console.log("Compile wasm for", sourceFile)
            let ret = await Js4Eos.compile(sourceFile, wasmFile, {flag:'o2'})
            if (ret) {
                console.log(ret.stderr, ret.stdout)
            }
            console.log("Generated abi for", sourceFile)
            ret = await Js4Eos.compile(sourceFile, abiFile, {flag:'g2', contract:argv.contract})
            if (ret) {
                console.log(ret.stderr, ret.stdout)
            }
        }
    } catch(e) {
        console.log(e)
    }
    return null;
}

exports.handler = function (argv) {
    compile(argv);
}