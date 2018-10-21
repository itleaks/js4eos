/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')
const Request = require('../../lib/request')

exports.command = 'claimeeth <account>'
exports.desc = 'claim token eeth for free'
exports.builder = {}
async function process(argv) {
    try {
        let ret = await Request.get("https://faucet.eosfavor.com/airdropaccount")
        ret = JSON.parse(ret)
        let data = [argv.account, ret[0].name, "1.0000 EETH", "免费领取EETH， wallet.eosfavor.com或者TP钱包Dapp发现栏搜索Eosfavor(Send 1 EETH to another account without EETH, you will get 5000 EETH as award),电报群:https://t.me/anyosio,更多请进:anyos.io"]
        ret = await Js4Eos.pushRawAction('ethsidechain', 'transfer', JSON.stringify(data), argv.account)
        Js4Eos.printTransaction(ret)
    } catch(e) {
        console.log(e)
    }
}

exports.handler = function (argv) {
    process(argv)
}