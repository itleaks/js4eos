/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'config <command>'
exports.desc = 'system configuration '
exports.builder = function (yargs) {
  return yargs.commandDir('config_cmds')
}
exports.handler = function (argv) {
}