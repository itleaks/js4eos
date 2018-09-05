/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'wallet <command>'
exports.desc = 'Interact with local wallet'
exports.builder = function (yargs) {
  return yargs.commandDir('wallet_cmds')
}
exports.handler = function (argv) {
}