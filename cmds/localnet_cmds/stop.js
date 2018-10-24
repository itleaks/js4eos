/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')
const Config = require('../../lib').getConfig()

var exec = require('child_process').exec;

exports.command = 'stop'
exports.desc = 'stop local eos network'
exports.builder = {}
async function process(argv) {
    let killDone = false;
    var killNodeos = 'pkill -9 nodeos';
    exec(killNodeos, function(err, stdout, stderr) {
        if (err) {
            // console.log(err)
        } else {
            console.log(stdout)
            console.log(stderr)
        }
    })
}

exports.handler = function (argv) {
    process(argv)
}