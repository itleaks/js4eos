/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'table <contract> <scope> <table>'
exports.desc = 'Retrieve the contents of a database table'
exports.builder = {}
exports.handler = function (argv) {
    Js4Eos.getTable(argv.contract, argv.scope, argv.table).then(ret => Js4Eos.printJson(ret));
}