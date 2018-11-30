/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/
var exec = require('child_process').exec;
var path = require('path')

exports.command = 'test [file]'
exports.desc = 'test'
exports.builder = yargs => yargs
    .options("g", {
        alias:'grep',
        desc:"grep pattern",
        type:'string',
    })
exports.handler = function (argv) {
    try {
        var currentDir = process.cwd()
        var binFile = path.join(currentDir, "node_modules")
        binFile = path.join(binFile, ".bin")
        binFile = path.join(binFile, "mocha")
        var cmd = binFile
        if (argv.file) {
            cmd = cmd + " " + argv.file
        }
        if (argv.grep) {
            cmd = binFile + " -g " + argv.grep
        }
        let tmp = exec(cmd)
        tmp.stdout.pipe(process.stdout);
        tmp.stderr.pipe(process.stderr);
    } catch(e) {
        console.log(e)
    }
}
