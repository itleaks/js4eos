/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'get <command>'
exports.desc = 'Retrieve various items and information from the blockchain'
exports.builder = function (yargs) {
  return yargs.commandDir('get_cmds')
}
exports.handler = function (argv) {
}