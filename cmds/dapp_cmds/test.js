/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/
var spawn = require('child_process').spawn;

exports.command = 'test'
exports.desc = 'test'
exports.builder = {}
exports.handler = function (argv) {
    try {
        let tmp = spawn('./node_modules/.bin/mocha')
        tmp.stdout.pipe(process.stdout);
        tmp.stderr.pipe(process.stderr);
    } catch(e) {
        console.log(e)
    }
}