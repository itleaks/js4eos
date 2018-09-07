/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'set <command>'
exports.desc = 'Set or update blockchain state'
exports.builder = function (yargs) {
  return yargs.commandDir('set_cmds')
}
exports.handler = function (argv) {
}