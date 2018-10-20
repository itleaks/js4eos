/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

var Config = require('./config').getConfig()
const fs = require('fs')

var Eosjs = require('./eosjs').eosjs;
const ecc = Eosjs.modules.ecc

var crypto = require('./crypto')

var keyFile = require('path').join(Config.dataDir, "wallet");
var filePasswd = null;
var keys = []
const MAGIC_DATA = 'js4eos'
var resetTimer = null;

function reset() {
    filePasswd = null;
    keys = [];
}

async function loadKeys(passwd) {
    if (fs.existsSync(keyFile)) {
        try {
            let encryptedData = fs.readFileSync(keyFile)
            console.log(encryptedData.toString())
            let decryptedData = crypto.decrypt('aes192', Buffer.from(passwd), encryptedData.toString())
            console.log(decryptedData)
            let data = JSON.parse(decryptedData.toString());
            if (data.header != MAGIC_DATA) {
                return false;
            }
            keys = data.keys;
            if (!keys) {
                keys = []
            }
            return true;
        } catch(e) {
            console.log(e)
            return false;
        }
    }
    return false;
}

exports.resetTime = function() {
    if (resetTimer) {
        clearTimeout(resetTimer)
    }
    resetTimer = setTimeout(reset, Config.keosd_provide_timeout);
}

exports.create = async function(passwd) {
    if (filePasswd || fs.existsSync(keyFile)) {
        return "wallet already exist"
    }
    filePasswd = passwd;
    this.saveKeys();
    return ""
}

exports.unlock = async function(passwd) {
    if (!fs.existsSync(keyFile)) {
        return "please create wallet before unlock"
    }
    reset();
    console.log(passwd)
    const ret = await loadKeys(passwd);
    if (!ret) {
        return "unlock fail,may wrong password"
    }
    filePasswd = passwd
    return "unlock success";
}

exports.saveKeys = async function() {
    console.log(filePasswd)
    let data = JSON.stringify({header:MAGIC_DATA, keys:keys});
    let encryptedData = crypto.encrypt("aes192", Buffer.from(filePasswd, 'utf8'), Buffer.from(data, 'utf8'))
    console.log(encryptedData)
    fs.writeFileSync(keyFile, encryptedData);
}

exports.getPrivateKeysSync = function() {
    return keys;
}

exports.getPrivateKeys = async function() {
    return keys;
}

exports.importKey = async function(key) {
    if (!filePasswd) {
        return "please unlock before import";
    }
    if (keys.indexOf(key) >= 0) {
        return "key already exist";
    }
    keys.push(key)
    this.saveKeys();
    return '';
}