/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'currency <command>'
exports.desc = 'Retrieve information related to standard currencies'
exports.builder = function (yargs) {
  return yargs.commandDir('currency_cmds')
}
exports.handler = function (argv) {
}