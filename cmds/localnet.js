/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'localnet <command>'
exports.desc = 'manage local eos network'
exports.builder = function (yargs) {
  return yargs.commandDir('localnet_cmds')
}
exports.handler = function (argv) {
}