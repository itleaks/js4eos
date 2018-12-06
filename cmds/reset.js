/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/
const fs = require('fs')
// const process = require('process')

exports.command = 'reset'
exports.desc = 'reset to initial state'
exports.builder = {}

function deleteall(path) {
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) {
				deleteall(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
  }
}

async function handle() {
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
      setTimeout(() => {
        try {
          deleteall(require('path').join(require('os').homedir(), ".js4eos"));
        } catch(e) {
          console.log(e)
          return "delete fail";
        }
      }, 1000)
    } catch(e) {
      console.log(e)
    }
  }, 1000);
}

exports.handler = function (argv) {
  handle()
}