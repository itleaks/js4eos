/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

var Config = require('./config').getConfig()
const fs = require('fs')
const Request = require('./request')
var crypto = require('./crypto')

var Eosjs = require('./eosjs').eosjs;
const ecc = Eosjs.modules.ecc

var keys = []

exports.createKey = async function() {
    let privateKey = await ecc.randomKey();
    let publicKey = ecc.privateToPublic(privateKey);
    return {
        privateKey,
        publicKey
    }
}

exports.privateToPublic = async function(privateKey) {
    let publicKey = ecc.privateToPublic(privateKey);
    return publicKey
}

exports.loadKeys = async function() {
    if (!Config.disable_keosd) {
        //Load key from remote
        let res = await Request.get('http://localhost:5555/keys');
        // console.log(res)
        keys = JSON.parse(res).data
        return;
    }
}

exports.createWallet = async function(wallet) {
    if (!Config.disable_keosd) {
        //Load key from remote
        let passwd = await crypto.randomPasswd();
        let res = await Request.get('http://localhost:5555/create?passwd='+passwd + "&name=" + wallet);
        res = JSON.parse(res).data
        if (!res) {
            console.log("password:")
            console.log(passwd)
        }
        return res;
    }
}

exports.lockWallet = async function(wallet) {
    if (!Config.disable_keosd) {
        //Load key from remote
        let res = await Request.get('http://localhost:5555/lock?name=' + wallet);
        res = JSON.parse(res).data
        this.loadKeys();
        return res;
    }
}


exports.unlockWallet = async function(wallet, passwd) {
    if (!Config.disable_keosd) {
        //Load key from remote
        let res = await Request.get('http://localhost:5555/unlock?passwd='+passwd + "&name=" + wallet);
        this.loadKeys();
        res = JSON.parse(res).data
        return res;
    }
}

exports.listWallet = async function() {
    if (!Config.disable_keosd) {
        //Load key from remote
        let res = await Request.get('http://localhost:5555/list');
        res = JSON.parse(res).data
        return res;
    }
}

exports.deleteWallet = async function(wallet) {
    if (!Config.disable_keosd) {
        //Load key from remote
        let res = await Request.get('http://localhost:5555/delete?name=' + wallet);
        res = JSON.parse(res).data
        this.loadKeys();
        return res;
    }
}

exports.getPrivateKeysSync = function() {
    console.log(keys)
    return keys;
}

exports.getPrivateKeys = async function() {
    await this.loadKeys();
    return keys;
}

exports.getPublicKeys = async function() {
    await this.loadKeys();
    let rets = []
    for (let key of keys) {
        let pubkey = await this.privateToPublic(key);
        rets.push(pubkey)
    }
    return rets;
}

exports.createKeyInWallet = async function(name) {
    let keys = await this.createKey();
    let ret = await this.importKey(name, keys.privateKey);
    if (ret !== false) {
        return keys;
    }
}

async function importKeyToServer(wallet, key) {
    let res = await Request.get('http://localhost:5555/import?key=' + key + "&name=" + wallet);
    res = JSON.parse(res).data
    return res;
}

exports.importKey = async function(wallet, key) {
    if (!Config.disable_keosd) {
        let ret = await importKeyToServer(wallet, key);
        if (ret) {
            console.log(ret);
            return false;
        }
    }
    await this.loadKeys();
    return keys;
}

this.loadKeys()