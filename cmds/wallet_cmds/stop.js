/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/
const fs = require('fs')

exports.command = 'stop'
exports.desc = 'stop wallet daemon'
exports.builder = {}

function handle() {
  bgpidFile = require('path').join(require('os').homedir(), ".js4eos_bg2.pid")
  var pid = 0;
  if (fs.existsSync(bgpidFile)) {
    try {
      pid = fs.readFileSync(bgpidFile).toString();
    } catch(e) {
        console.log(e)
    }
  }
  if (!pid) {
    console.log("Not found bg process")
    return;
  }

  setTimeout(() => {
    try {
      var isWin = process.platform === "win32"
      if (isWin) {
        var exec = require('child_process').exec
        exec("taskkill /f /pid " + pid)
      } else {
        process.kill(pid, 'SIGHUP');
      }
      console.log("stop success")
    } catch(e) {
      console.log(e)
    }
  }, 1000);
}

exports.handler = function (argv) {
  handle()
}