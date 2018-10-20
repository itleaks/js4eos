/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../lib')
const Config = Js4Eos.getConfig()

exports.command = 'compile <file>'
exports.desc = 'compile contract, only support one file currently'
exports.builder = yargs => yargs
    .options("g", {
        desc:"generate abi",
        type:'string',
    })
    .options("o", {
        desc:"generate wasm",
        type:'string',
    })

exports.handler = function (argv) {
    if (argv.g) {
      Js4Eos.abi(argv.file, argv.g).then(data => {
        console.log(data.stderr);
        console.log(data.stdout);
        console.log("Saving to", data.file);
      })
    }
    if (argv.o) {
      Js4Eos.compile(argv.file, argv.o).then(data => {
        console.log(data.stderr);
        console.log(data.stdout);
        console.log("Saving to", data.file);
      })
    }
}