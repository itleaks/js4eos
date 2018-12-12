/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/
var fs = require('fs')
var exec = require('child_process').exec;
var unzip = require("unzip");
var Js4Eos = require('../../lib')
var Utils = require("../../lib/utils")

exports.command = 'init'
exports.desc = 'init a eos dapp project'
exports.builder = yargs => yargs
.options("v", {
    alias:"version",
    desc:"init a vscode demo application",
    type:'string',
    default:'master',
})
const ZIP_DIR_PREFIX = 'js4eos-demo-'
async function handle(argv) {
    let url = Js4Eos.getConfig().appdemourl2 + "/" + argv.version + ".zip"
    console.log("Downloading", url)
    await Utils.downloadFile(url, './tmp.zip');
    var ZIP_DIR = ZIP_DIR_PREFIX + argv.version;
    fs.createReadStream('./tmp.zip').pipe(unzip.Extract({ path: './' })).on('close', function () {
        files = fs.readdirSync(ZIP_DIR);
		files.forEach(function(file, index) {
            var curPath = ZIP_DIR + '/' + file;
            var dstPath = './' + file;
			fs.renameSync(curPath, dstPath);
        });
        try {
		    fs.rmdirSync(ZIP_DIR);
        } catch(e) {
            console.log(e)
        }
        try {
		    fs.unlinkSync('./tmp.zip');
        } catch(e) {
            console.log(e)
        }
        try{
            exec('npm install', function (error, stdout, stderr) {
                process.stdout.write(stdout)
                process.stderr.write(stderr)
            });
        } catch(e) {
            console.log(e)
        }
    }).on('error', function(err){
        console.log("fail");
    });
}

exports.handler = function (argv) {
    handle(argv)
}