/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'system <command>'
exports.desc = 'Send eosio.system contract action to the blockchain.'
exports.builder = function (yargs) {
  return yargs.commandDir('system_cmds')
}
exports.handler = function (argv) {
}