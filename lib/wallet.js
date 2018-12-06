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

const PORT = '6666'

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
    if (!Config.inLibMode) {
        //Load key from remote
        let res = await Request.get('http://localhost:' + PORT + '/keys');
        // console.log(res)
        keys = JSON.parse(res).data
        return;
    }
}

exports.createWallet = async function(wallet) {
    if (!Config.inLibMode) {
        //Load key from remote
        let passwd = await crypto.randomPasswd();
        let res = await Request.get('http://localhost:' + PORT + '/create?passwd='+passwd + "&name=" + wallet);
        res = JSON.parse(res).data
        if (!res) {
            console.log("wallet password:")
            console.log(passwd)
        }
        return res;
    }
}

exports.lockWallet = async function(wallet) {
    if (!Config.inLibMode) {
        //Load key from remote
        let res = await Request.get('http://localhost:' + PORT + '/lock?name=' + wallet);
        res = JSON.parse(res).data
        this.loadKeys();
        return res;
    }
}


exports.unlockWallet = async function(wallet, passwd) {
    if (!Config.inLibMode) {
        //Load key from remote
        let res = await Request.get('http://localhost:' + PORT + '/unlock?passwd='+passwd + "&name=" + wallet);
        this.loadKeys();
        res = JSON.parse(res).data
        return res;
    }
}

exports.listWallet = async function() {
    if (!Config.inLibMode) {
        //Load key from remote
        let res = await Request.get('http://localhost:' + PORT + '/list');
        res = JSON.parse(res).data
        return res;
    }
}

exports.deleteWallet = async function(wallet) {
    if (!Config.inLibMode) {
        //Load key from remote
        try {
            let res = await Request.get('http://localhost:' + PORT + '/delete?name=' + wallet);
            res = JSON.parse(res).data
            this.loadKeys();
            return res;
        } catch(e) {
            console.log(e)
        }
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
        try{
            let pubkey = await this.privateToPublic(key);
            rets.push(pubkey)
        } catch(e) {
            console.log("Invalid private key, ", key)
        }
    }
    return rets;
}

exports.createKeyInWallet = async function(name) {
    let keys = await this.createKey();
    let ret = await this.importKey(name, keys.privateKey);
    return;
}

async function importKeyToServer(wallet, key) {
    let res = await Request.get('http://localhost:' + PORT + '/import?key=' + key + "&name=" + wallet);
    res = JSON.parse(res).data
    return res;
}

exports.importKey = async function(wallet, key) {
    try {
        let pubKey = await this.privateToPublic(key);
    } catch(e) {
        console.log("Invalid private key, ", key)
        return;
    }
    if (!Config.inLibMode) {
        let ret = await importKeyToServer(wallet, key);
        if (ret) {
            console.log(ret);
            return false;
        }
    }
    await this.loadKeys();
    return true;
}

this.loadKeys()