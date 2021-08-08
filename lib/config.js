/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/
const Request = require('./request')
var fs = require('fs');
var config = {}
defaultConfig = {
    networks:{
        mainnet: {
            chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
            httpEndpoint:'http://eos.greymass.com',
            httpEndpoints:[
                'http://eos.greymass.com',
            ],
            keyPrefix:'EOS',
        },
        localnet: {
            chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
            httpEndpoint:'http://127.0.0.1:8888',
            keyPrefix:'EOS',
        },
        eosforce: {
            chainId:'bd61ae3a031e8ef2f97ee3b0e62776d6d30d4833c8f7c1645c657b149151004b',
            httpEndpoint:'http://47.97.115.84:8888',
            keyPrefix:'EOS',
        },
        jungle: {
            chainId:'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
            httpEndpoint:'http://jungle2.cryptolions.io:8888',
            httpEndpoints:[
                'https://jungle2.cryptolions.io:443',
                'http://jungle.eosgen.io:80',
                'https://api.jungle.alohaeos.com:443',
                'http://145.239.133.201:8888',
            ],
            keyPrefix:'EOS',
            faucet: {
                type:"api",
                url:"http://api.eosfavor.com/faucetaccount",
            }
        },
        kylin: {
            chainId:'5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
            httpEndpoint:'http://kylin.meet.one:8888',
            httpEndpoints: [
                'http://39.108.231.157:30065',
                'http://api.kylin.eoseco.com',
                'https://api-kylin.eoslaomao.com',
            ],
            keyPrefix:'EOS',
        },
        enu: {
            chainId:'5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
            httpEndpoint:'http://enu.mytokenpocket.vip',
            keyPrefix:'ENU',
        },
        fibos: {
            chainId:'6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a',
            httpEndpoint:'http://se-rpc.fibos.io:8870',
            keyPrefix:'FO',
        },
        bos: {
            chainId:'d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86',
            httpEndpoint:'http://api.bos.alohaeos.com',
            httpEndpoints: [
                'http://api.bos.alohaeos.com',
                'http://bosapi-one.eosstore.co:8888',
                'http://bosapi-two.eosstore.co:8888',
            ],
            keyPrefix:'EOS',
        },
        bostest: {
            chainId:'33cc2426f1b258ef8c798c34c0360b31732ea27a2d7e35a65797850a86d1ba85',
            httpEndpoint:'http://bos-testnet.meet.one:8888',
            httpEndpoints: [
                'http://bos-testnet.meet.one:8888',
                'http://bos-testnet.mytokenpocket.vip:8890',
                'https://bos-testnet.eosphere.io',
                'https://bostest.api.blockgo.vip',
            ],
            keyPrefix:'EOS',
        },
        meetone: {
            chainId:'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422',
            httpEndpoint:'https://fullnode.meet.one',
            httpEndpoints: [
                'https://api.meetone.eostribe.io',
                'https://meetseed.ikuwara.com:8889',
                'https://api.meetone.alohaeos.com',
                'https://meetone.eossweden.eu',
            ],
            keyPrefix:'EOS',
        },
    },
    faucet:{
        type:'web',
        url:'https://github.com/itleaks/js4eos/blob/master/docs/faucet.md'
    },
    network:{},
    currentNetwork:'mainnet',
    serviceUrl:'http://api.eosfavor.com',
    syncUrl:'https://raw.githubusercontent.com/itleaks/js4eos/master/files/config.json',
    dataDir:require('path').join(require('os').homedir(), ".js4eos"),
    appdemourl:'https://github.com/itleaks/js4eos-demo/archive/master.zip',
    appdemourl2:'https://github.com/itleaks/js4eos-demo/archive',
    keosd_provide_timeout:30*60*1000, //30min
    inLibMode:false,
}

if (process.env.JS4EOS_DATADIR) {
    defaultConfig.dataDir = require('path').join(process.env.JS4EOS_DATADIR, ".js4eos")
}
if (!fs.existsSync(defaultConfig.dataDir)) {
    try {
        fs.mkdirSync(defaultConfig.dataDir,'0777', true)
    } catch(e) {
        console.log(e)
    }
}

var configFile = require('path').join(defaultConfig.dataDir, "config.json");
function loadConfig() {
    let config = {}
    var applyingConfig = configFile
    if (!fs.existsSync(applyingConfig)) {
        var applyingConfig = require('path').join(__dirname + "/../files", "config.json");
        if (!fs.existsSync(applyingConfig)) {
            console.log("use built-in config")
            return config
        }
        console.log("use default config")
    }
    try {
        let data = fs.readFileSync(applyingConfig);
        config = JSON.parse(data);
    } catch(e) {
        console.log(e)
    }
    return config;
}

exports.enterLibMode = function(value) {
    config.inLibMode = value;
    updateNetwork()
}

exports.resetConfig = async function() {
    if (config.inLibMode) {
        config = defaultConfig
        return config
    }
    if (!fs.existsSync(configFile)) {
        return config
    }
    try {
        fs.unlinkSync(configFile);
    } catch(e) {
        console.log("reset fail")
    }
    config = defaultConfig
    updateNetwork()
    return config
}

exports.saveConfig = function(newConfig) {
    if (config.inLibMode) {
        console.log("Not Support on lib mode")
        return;
    }
    if (config['dataDir'] != undefined) {
        delete config['dataDir']
    }
    let data = JSON.stringify(newConfig);
    try {
        fs.writeFileSync(configFile, data);
    } catch(e) {
        console.log(e)
    }
    config = newConfig
    updateNetwork()
}

exports.getConfig = function() {
    return config;
}

function setNetwork(network) {
    // let current = config.networks[config.currentNetwork];
    config.network.chainId = network.chainId
    config.network.httpEndpoint = network.httpEndpoint
    config.network.keyPrefix = network.keyPrefix
}

exports.setNetwork = setNetwork

function updateNetwork() {
    setNetwork(config.networks[config.currentNetwork]);
}

exports.getNetwork = function() {
    return config.network;
}

exports.setKeyProvider = function(keyProvider) {
    config.keyProvider = keyProvider
}

exports.syncConfig = async function() {
    if (config.inLibMode) {
        console.log("Not Support on lib mode")
        return;
    }
    try {
        let res = await Request.get(config.syncUrl);
        config = JSON.parse(res)
        return config;
    } catch(e) {
        return null;
    }
}

var userConfig = loadConfig();
if (userConfig['dataDir'] != undefined) {
    delete userConfig['dataDir']
}
config = {...defaultConfig, ...userConfig}
updateNetwork()
