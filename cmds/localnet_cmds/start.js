/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

var exec = require('child_process').exec;
var fs = require('fs');


const Js4Eos = require('../../lib')
const Config = require('../../lib').getConfig()

const DEFAULT_PUB_KEY = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
const DEFAULT_PRI_KEY = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
const NODEOS_CMD_PREFIX = 'nodeos -e -p eosio --http-server-address 0.0.0.0:8888 --max-transaction-time=1000 --contracts-console --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin'

exports.command = 'start [datadir]'
exports.desc = 'start local eos network'

exports.builder = yargs => yargs
    .options("p", {
        alias:'privatekey',
        desc:"private key",
        type:'string',
    })

async function process(argv) {
    startNodeos(argv)
}

async function startNodeos(argv) {
    let keys = {};
    if (false && argv.privatekey) {
        if (argv.privatekey == MAGIC_KEY) {
            keys = Js4Eos.createKey();
        } else {
            keys.publicKey = await Js4Eos.privateToPublic(argv.privatekey)
            keys.privateKey = argv.privatekey
        }
    } else {
        keys = {
            privateKey:DEFAULT_PRI_KEY,
            publicKey:DEFAULT_PUB_KEY
        };
    }
    let dataDir = argv.datadir
    if (!dataDir) {
        dataDir = Config.dataDir + "/nodeos"
    }
    let logFile = dataDir + "/output.log"
    let cmd = NODEOS_CMD_PREFIX + ' --hard-replay-blockchain --config-dir ' + dataDir + ' --data-dir ' + dataDir + ' --private-key [' + keys.publicKey + ',' + keys.privateKey +'] > ' + logFile + ' 2>&1'
    // console.log(args)
    try {
        var daemon = require("daemonize2").setup({
            main: "bg_service",
            name: "js4eos_nodeos",
            pidfile: require('path').join(require('os').homedir(), ".js4eos_nodeos.pid"),
            argv:[cmd]
        });
        var pid = daemon.status();
        if (!pid) {
          daemon.start();
          daemon.on('started', () => {
            console.log("Reset nodeos success, eosio account")
            console.log(keys)
         });
        } else {
            console.log("nodeos is already running")
        }
    } catch(e) {
        console.log(e)
    }
}

exports.handler = function (argv) {
    process(argv)
}