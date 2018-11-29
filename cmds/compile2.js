/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../lib')
const Config = Js4Eos.getConfig()

exports.command = 'compile2 <file>'
exports.desc = 'compile2 support new feature of eosio.cdt'
exports.builder = yargs => yargs
    .options("g", {
        desc:"generate abi",
        type:'string',
    })
    .options("o", {
        desc:"generate wasm",
        type:'string',
    })
    .options("c", {
      alias:"contract",
      desc:"contract name",
      type:'string',
   })

exports.handler = function (argv) {
    if (argv.g) {
      if (!argv.contract) {
        console.log("must given contract name with --contract")
        return;
      }

      Js4Eos.compile(argv.file, argv.g, {flag:'g2',contract:argv.contract}).then(data => {
        if (!data) {
          return;
        }
        console.log(data.stderr);
        console.log(data.stdout);
        console.log("Saving to", data.file);
      })
    }
    if (argv.o) {
      Js4Eos.compile(argv.file, argv.o, {flag:'o2'}).then(data => {
        if (!data) {
          return;
        }
        console.log(data.stderr);
        console.log(data.stdout);
        console.log("Saving to", data.file);
      })
    }
}