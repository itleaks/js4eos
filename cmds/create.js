/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'create <command>'
exports.desc = 'Create various items, on and off the blockchain'
exports.builder = function (yargs) {
  return yargs.commandDir('create_cmds')
}
exports.handler = function (argv) {
}