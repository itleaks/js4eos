/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'choose <config>'
exports.desc = 'choose configuration'
exports.builder = function (yargs) {
  return yargs.commandDir('choose_cmds')
}
exports.handler = function (argv) {
}