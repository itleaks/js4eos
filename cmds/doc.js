/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'doc <command>'
exports.desc = 'document'
exports.builder = function (yargs) {
  return yargs.commandDir('doc_cmds')
}
exports.handler = function (argv) {
}