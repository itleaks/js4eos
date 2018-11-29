var request = require('request');
var path = require('path');
var fs = require('fs');
var Config = require('./config').getConfig()
var Utils = require("./utils")
var commandExists = require('command-exists')
var exec = require("child_process").exec

function compileInner(file, targetFile, args) {
  return new Promise(function(resolve, reject) {
    // console.log(args)
    var req = request.post(Config.serviceUrl + "/newcompile", function (err, response, data) {
      try {
        data = JSON.parse(data);
      } catch(e) {
        console.log("fail due to network or error, please check network and try again")
        console.log(e)
        return;
      }
      if (data.file) {
        Utils.downloadFile(Config.serviceUrl + "/" + data.file, targetFile).then(() => {
          data.file = targetFile;
          resolve(data);
        })
      }
    });
    try {
      var form = req.form();
      for (let key in args) {
        form.append(key, args[key])
      }
      form.append('file', fs.createReadStream(file), {
        filename: path.basename(file),
        contentType: 'text/plain'
      });
    } catch(e) {
      console.log(e)
    }
  });
}

async function tryLocalCompile(file, targetFile, args) {
  var localCompile = false

  if (args.flag == 'o' || args.flag == 'g') {
    try {
      await commandExists('eosiocpp')
      localCompile = true;
    } catch (e) {
    }
    if (!localCompile) {
      return false;
    }
    let cmd;
    if (args.flag == 'o') {
      cmd = 'eosiocpp -o ' + targetFile + ' ' + file
    } else {
      cmd = 'eosiocpp -g ' + targetFile + ' ' + file
    }
    try {
      let tmp = exec(cmd)
      tmp.stdout.pipe(process.stdout);
      tmp.stderr.pipe(process.stderr);
      return true;
    } catch(e) {
      console.log(e)
    }
  } else if (args.flag == 'g2' || args.flag == 'o2') {
    try {
      await commandExists('eosio-cpp')
      localCompile = true;
    } catch (e) {
    }
    if (!localCompile) {
      return false;
    }
    let cmd;
    if (args.flag == 'o2') {
      cmd = 'eosio-cpp -o ' + targetFile + ' ' + file
    } else {
      cmd = 'eosio-abigen --output ' + targetFile + ' ' + file + ' --contract ' + args.contract
    }
    try {
      let tmp = exec(cmd)
      tmp.stdout.pipe(process.stdout);
      tmp.stderr.pipe(process.stderr);
      return true;
    } catch(e) {
      console.log(e)
    }
  }
  return true;
}

exports.compile = async function(file, targetFile, args) {
    if (!fs.existsSync(file)) {
      console.log(file, " not found")
      return;
    }
    let codeDir = require('path').dirname(file)
    let fileName = require('path').basename(file)
    let pos = fileName.lastIndexOf(".")
    let realFileName = fileName.slice(0, pos)
    let ext = '';
    if (pos >= 0) {
      ext = fileName.slice(pos+1)
    }
    if (ext != 'cpp') {
      return {
        stderr:'must be a cpp file'
      }
    }
    let local = await tryLocalCompile(file, targetFile, args);
    if (local) {
      return;
    }
    let zipFile = require('os').tmpdir() + "/" + realFileName + ".zip"
    await Utils.archiveCode(codeDir, zipFile)
    let ret = await compileInner(zipFile, targetFile, args);
    return ret;
}