var Config = require('./config')
var EosHelper = require('./eoshelper')
var Wallet = require('./wallet')
var Api = require('./api')
var Compile = require('./compile')
var Utils = require('./utils')
module.exports = {
    ...EosHelper, ...EosHelper.EOS(), ...Api, ...Wallet, ...Config, ...Compile, ...Utils
}