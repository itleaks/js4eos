/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

var exec = require('child_process').exec;
var fs = require('fs');


const Js4Eos = require('../../lib')
const Config = require('../../lib').getConfig()

const DEFAULT_PUB_KEY = 'EOS6UjW66Tob4k5an2tFf9ytCUJyQG3FnrX6LykCDeHPpznQ3Zbuj';
const DEFAULT_PRI_KEY = '5JY1oKyPUby8SCnN8MzopfWp7SXU9KWUa2TWH3orncy9Unj4xDG';
const NODEOS_CMD_PREFIX = 'nodeos -e -p eosio --http-server-address 0.0.0.0:8888 --max-transaction-time=1000 --contracts-console --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin'

exports.command = 'reset [datadir]'
exports.desc = 'reset local eos network'

exports.builder = yargs => yargs
    .options("p", {
        alias:'privatekey',
        desc:"private key",
        type:'string',
    })
 
async function process(argv) {
    let killDone = false;
    var killNodeos = 'pkill -9 nodeos';
    exec(killNodeos, function(err, stdout, stderr) {
        // console.log(err, stdout, stderr)
        startNodeos(argv);
    })
}

async function startNodeos(argv) {
    let keys = {};
    if (argv.privatekey) {
        keys.publicKey = await Js4Eos.privateToPublic(argv.privatekey)
        keys.privateKey = argv.privatekey
    } else {
        keys = await Js4Eos.createKey();
    }
    let dataDir = argv.datadir
    if (!dataDir) {
        dataDir = Config.dataDir + "/nodeos"
    }
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, '0777', true)
    }
    let logFile = dataDir + "/output.log"
    let cmd = NODEOS_CMD_PREFIX + ' --delete-all-blocks --data-dir ' + dataDir + ' --private-key [' + keys.publicKey + ',' + keys.privateKey +'] > ' + logFile + ' 2>&1'
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
            console.log("kill old nodeos fail, please kill it manually")
        }
    } catch(e) {
        console.log(e)
    }
}

exports.handler = function (argv) {
    process(argv)
}