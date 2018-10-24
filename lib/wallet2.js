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
var utils = require('./utils')

var filePasswds = {};
var keyList = {};

var walletDir = Config.dataDir + "/wallets";
console.log(walletDir)
var wallets = []
if (!fs.existsSync(walletDir)) {
    fs.mkdirSync(walletDir, '0777', true)
} else {
    wallets = utils.readDirFilesSync(walletDir);
}
console.log(wallets)

const MAGIC_DATA = 'js4eos'
var resetTimer = null;

function reset(wallet=null) {
    if (!wallet) {
        filePasswds = {};
        keyList = [];
    } else {
        delete filePasswds[wallet]
        delete keyList[wallet]
    }
}

function getKeys() {
    let keys = []
    for (let wallet in keyList) {
        for (let key of keyList[wallet]) {
            if (keys.indexOf(key) == -1) {
                keys.push(key)
            }
        }
    }
    console.log(keyList)
    console.log(keys)
    return keys
}

function getKeyPasswd(wallet) {
    return filePasswds[wallet]
}

function getKeyFile(wallet) {
    return walletDir + "/" + wallet
}

async function loadKeys(wallet, passwd) {
    let keys = []
    let keyFile = getKeyFile(wallet)
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
            return keys;
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

exports.create = async function(wallet, passwd) {
    if (fs.existsSync(getKeyFile(wallet))) {
        return "wallet already exist"
    }
    console.log(wallet, passwd)
    filePasswds[wallet] = passwd;
    wallets.push(wallet)
    keyList[wallet] = []
    this.saveKeys(wallet);
    return ""
}

exports.unlock = async function(wallet, passwd) {
    let keyFile = getKeyFile(wallet);
    if (!fs.existsSync(keyFile)) {
        return "please create wallet before unlock"
    }
    reset(wallet);
    console.log(passwd)
    const ret = await loadKeys(wallet, passwd);
    if (ret === false) {
        return "unlock fail,may wrong password"
    }
    filePasswds[wallet] = passwd
    keyList[wallet] = ret
    return "unlock success";
}

exports.lock = async function(wallet) {
    reset(wallet)
    return "lock success";
}

exports.delete = async function(wallet) {
    reset(wallet)
    try{
        fs.unlinkSync(getKeyFile(wallet));
    } catch(e) {
        console.log(e)
        return "delete fail";
    }
    let index = wallets.indexOf(wallet);
    if (index > -1) {
        wallets.splice(index, 1);
    }
    return "delete success";
}

exports.list = async function() {
    let ret = []
    for (let wallet of wallets) {
        if (getKeyPasswd(wallet)) {
            ret.push(wallet)
        } else {
            ret.push(wallet + " [*] ")
        }
    }
    console.log("list", ret)
    return ret;
}

exports.saveKeys = async function(wallet) {
    let filePasswd = getKeyPasswd(wallet)
    let keyFile = getKeyFile(wallet);
    let data = JSON.stringify({header:MAGIC_DATA, keys:keyList[wallet]});
    let encryptedData = crypto.encrypt("aes192", Buffer.from(filePasswd, 'utf8'), Buffer.from(data, 'utf8'))
    console.log(encryptedData)
    fs.writeFileSync(keyFile, encryptedData);
}

exports.getPrivateKeysSync = function() {
    let keys = getKeys();
    return keys;
}

exports.getPrivateKeys = async function() {
    let keys = getKeys();
    return keys;
}

exports.importKey = async function(wallet, key) {
    if (!getKeyPasswd(wallet)) {
        return "please unlock before import";
    }
    if (!keyList[wallet]) {
        keyList[wallet] = []
    }
    if (keyList[wallet].indexOf(key) >= 0) {
        return "key already exist";
    }
    keyList[wallet].push(key)
    this.saveKeys(wallet);
    return '';
}