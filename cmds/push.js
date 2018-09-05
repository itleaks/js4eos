/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'push <command>'
exports.desc = 'Push arbitrary transactions to the blockchain'
exports.builder = function (yargs) {
  return yargs.commandDir('push_cmds')
}
exports.handler = function (argv) {
}