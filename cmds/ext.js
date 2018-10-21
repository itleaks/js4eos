/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'ext <command>'
exports.desc = 'extended command'
exports.builder = function (yargs) {
  return yargs.commandDir('ext_cmds')
}
exports.handler = function (argv) {
}