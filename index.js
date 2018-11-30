const path = require('path')
const fs = require('fs')

function actionCall(contract, action) {
    return async function() {
        var data = []
        for (k in arguments) {
            data.push(arguments[k])
        }
        return await Js4eos.pushRawAction(contract.account, action, JSON.stringify(data), contract.actor)
    }
}

function actorCall(contract) {
    return (actor) => {
        contract.actor = actor;
    }
}

function tableCall(contract) {
    return async(table, scope, table_key, lower_bound, upper_bound, limit, key_type, index_position) => {
        return await Js4eos.getTable(contract.account, scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position)
    }
}

async function requireContract(name, network) {
    var configFile = path.join(process.cwd(), "js4eos_config.js")
    if (!fs.existsSync(configFile)) {
        console.log("No config file js4eos_config.js")
        return;
    }
    let config = require(configFile)
    let contractDir = path.join("./contracts", name)
    let sourceAbi = path.join(contractDir, name + ".abi");
    if (!fs.existsSync(sourceAbi)) {
        throw("contract abi file " + sourceAbi + " not exist, please deploy firstly")
    }

    var abi
    try {
        let data = fs.readFileSync(sourceAbi)
        // console.log(data.toString())
        abi = JSON.parse(data.toString());
    } catch(e) {
        console.log(e)
        return false;
    }

    if (!network) {
        network = process.env.JS4EOS_APP_NETWORK ? process.env.JS4EOS_APP_NETWORK : config.defaultNetwork
    }
    let contractAccount = config.deploy[name][network]
    var Contract = {account:contractAccount}
    Contract.setActor = actorCall(Contract)
    Contract.table = tableCall(Contract)
    for (let action of abi.actions) {
        Contract[action.name] = actionCall(Contract, action.name)
    }
    return Contract;
}

async function contract(account) {

    var ret = await Js4eos.getAbi(account)
    if (!ret || !ret.abi) {
        throw("Contract not found")
    }
    var abi = ret.abi;
    var Contract = {account}
    Contract.setActor = actorCall(Contract)
    Contract.table = tableCall(Contract)
    for (let action of abi.actions) {
        Contract[action.name] = actionCall(Contract, action.name)
    }
    return Contract;
}

function createJs4Eos(options) {
    if (!options) {
        throw("please set a js4eos app config")
    }
    var Config = require('./lib/config')
    Config.enterLibMode(true)
    Config.setNetwork(options.network)
    Config.setKeyProvider(options.keyProvider)
    var lib = require('./lib')
    lib.ResetEos();
    lib.RequireContract = requireContract
    lib.Contract = contract
    return lib
}

function loadOptions() {
    try {
        var currentDir = process.cwd()
        var configFile = require('path').join(currentDir, "js4eos_config.js")
        if (!fs.existsSync(configFile)) {
            return null;
        }
        let config = require(configFile)
        var network = process.env.JS4EOS_APP_NETWORK ? process.env.JS4EOS_APP_NETWORK : config.defaultNetwork
        return {
            network:config.networks[network],
            keyProvider:config.keyProvider
        }
    } catch(e) {
        console.log(e)
    }
    return null;
}

Js4Eos = function Js4Eos(options) {
    let defaultOptions = loadOptions();
    if (options && options.keyProvider && defaultOptions && defaultOptions.keyProvider instanceof Array) {
        options.keyProvider = defaultOptions.keyProvider.concat(options.keyProvider);
    }
    options = Object.assign(defaultOptions, options);
    // console.log(options)
    return createJs4Eos(options)
}

module.exports = Js4Eos
