/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

var Config = require('./config').getConfig()
const ecc = require('eosjs-ecc')
const fs = require('fs')

var keyFile = require('path').join(Config.dataDir, "keys");
var keys = []

exports.createKey = async function() {
    let privateKey = await ecc.randomKey();
    let publicKey = ecc.privateToPublic(privateKey);
    return {
        privateKey,
        publicKey
    }
}

exports.loadKeys = async function() {
    if (fs.existsSync(keyFile)) {
        let data = fs.readFileSync(keyFile);
        try {
            keys = JSON.parse(data);
        } catch(e) {
            console.log(e)
        }
    }
}

exports.saveKeys = async function() {
    let data = JSON.stringify(keys);
    fs.writeFileSync(keyFile, data);
}

exports.getPrivateKeysSync = function() {
    return keys;
}

exports.getPrivateKeys = async function() {
    return keys;
}

exports.importKey = async function(key) {
    if (keys.indexOf(key) >= 0) {
        console.log("key already exist");
        return;
    }
    keys.push(key)
    this.saveKeys();
    return keys;
}

this.loadKeys()