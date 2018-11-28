/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'dapp <command>'
exports.desc = 'dapp commands'
exports.builder = function (yargs) {
  return yargs.commandDir('dapp_cmds')
}
exports.handler = function (argv) {
}