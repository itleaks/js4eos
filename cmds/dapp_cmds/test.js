/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/
var exec = require('child_process').exec;
var path = require('path')

exports.command = 'test'
exports.desc = 'test'
exports.builder = {}
exports.handler = function (argv) {
    try {
        var currentDir = process.cwd()
        var binFile = path.join(currentDir, "node_modules")
        binFile = path.join(binFile, ".bin")
        binFile = path.join(binFile, "mocha")
        let tmp = exec(binFile)
        tmp.stdout.pipe(process.stdout);
        tmp.stderr.pipe(process.stderr);
    } catch(e) {
        console.log(e)
    }
}