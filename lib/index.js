
var Config = require('./config')
var EosHelper = require('./eoshelper')
var Wallet = require('./wallet')
var Api = require('./api')
module.exports = {
    ...EosHelper.EOS, ...Api, ...Wallet, ...Config
}