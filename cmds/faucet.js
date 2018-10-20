/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../lib')
const open = require('open')
const Request = require('../lib/request')

exports.command = 'faucet <account>'
exports.desc = 'faucet'
exports.builder = {}

async function createAccount(url, account) {
    try {
        let data = await Js4Eos.createKey()
        // console.log(url)
        let res = await Request.get(url,{
            account,
            key:data.publicKey,
        });
        res = JSON.parse(res)
        // console.log(res)
        if (res.error == 0) {
            console.log("create account success")
            data.account = account;
            Js4Eos.printJson(data)
            return;
        } else {
            Js4Eos.printJson(res.info)
        }
    } catch(e) {
        console.log(e)
    }
    console.log("create account fail")
}

exports.handler = function (argv) {
    let config = Js4Eos.getConfig()
    let faucetConfig = Js4Eos.getNetwork().faucet
    if (!faucetConfig) {
        faucetConfig = config.faucet
    }
    // console.log(faucetConfig)

    if (faucetConfig.type == 'web') {
        open(faucetConfig.url);
    } else {
        createAccount(faucetConfig.url, argv.account)
    }
}
