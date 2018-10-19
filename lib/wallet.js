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

exports.loadKeys = async function() {
    if (!Config.disable_keosd) {
        //Load key from remote
        let res = await Request.get('http://localhost:5555/keys');
        // console.log(res)
        keys = JSON.parse(res).data
        return;
    }
}

exports.create = async function() {
    if (!Config.disable_keosd) {
        //Load key from remote
        let passwd = await crypto.randomPasswd();
        let res = await Request.get('http://localhost:5555/create?passwd='+passwd);
        res = JSON.parse(res).data
        if (!res) {
            console.log("password:")
            console.log(passwd)
        }
        return res;
    }
}

exports.unlock = async function(passwd) {
    if (!Config.disable_keosd) {
        //Load key from remote
        let res = await Request.get('http://localhost:5555/unlock?passwd='+passwd);
        this.loadKeys();
        res = JSON.parse(res).data
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

async function importKeyToServer(key) {
    let res = await Request.get('http://localhost:5555/import?key=' + key);
    res = JSON.parse(res).data
    return !res.data;
}

exports.importKey = async function(key) {
    if (keys.indexOf(key) >= 0) {
        console.log("key already exist");
        return;
    }
    if (!Config.disable_keosd) {
        let ret = await importKeyToServer(key);
        if (!ret) {
            console.log("import key error");
            return;
        }
    }
    keys.push(key)
    return keys;
}

this.loadKeys()