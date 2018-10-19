/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

exports.command = 'version'
exports.desc = 'version of js4eos'
exports.builder = {}
exports.handler = function (argv) {
  var pjson = require('../package.json');
  console.log(pjson.version);
}