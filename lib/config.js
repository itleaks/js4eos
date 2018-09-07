/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

var fs = require('fs');
var config = {}
defaultConfig = {
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    httpEndpoint:'http://bp.cryptolions.io:8888',
    dataDir:require('path').join(require('os').homedir(), ".js4eos"),
    keyPrefix:'EOS',
}

if (!fs.existsSync(defaultConfig.dataDir)) {
    fs.mkdirSync(defaultConfig.dataDir,'0777', true)
}

var configFile = require('path').join(defaultConfig.dataDir, "config.json");

function loadConfig() {
    let config = {}
    if (!fs.existsSync(configFile)) {
        return config
    }
    try {
        let data = fs.readFileSync(configFile);
        config = JSON.parse(data);
    } catch(e) {
        console.log(e)
    }
    return config;
}

function saveConfig(config) {
    let data = JSON.stringify(config);
    fs.writeFileSync(configFile, data);
}

function getConfig() {
    return config;
}

var userConfig = loadConfig();
config = {...defaultConfig, ...userConfig}
module.exports = {getConfig, saveConfig};
