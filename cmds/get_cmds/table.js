/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

const Js4Eos = require('../../lib')

exports.command = 'table <contract> <scope> <table>'
exports.desc = 'Retrieve the contents of a database table'
exports.builder = yargs => yargs
.options("l", {
    alias:"limit",
    desc:"The maximum number of rows to return",
    type:'number',
    default:10,
})
.options("L", {
    alias:"lower",
    desc:"JSON representation of lower bound value of key, defaults to first",
    type:'string',
    default:'',
})
.options("U", {
    alias:"upper",
    desc:"JSON representation of upper bound value value of key, defaults to last",
    type:'string',
    default:'',
})
.options("i", {
    alias:"index",
    desc:"Index number, 1 - primary (first), 2 - secondary index (in order defined by multi_index), 3 - third index, etc.",
    type:'number',
    default:1,
})
.options("k", {
    alias:"key_type",
    desc:"The key type of --index, primary only supports (i64), all others support (i64, i128, i256, float64, float128, ripemd160, sha256).",
    type:'string',
    default:'',
})
exports.handler = function (argv) {
    Js4Eos.getTable(argv.contract, argv.scope, argv.table, argv.lower, argv.upper, argv.limit, argv.key_type, argv.index).then(ret => Js4Eos.printJson(ret));
}