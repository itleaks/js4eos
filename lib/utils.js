var request = require('request');
var fs = require('fs')

exports.downloadFile = function(uri, filename){
    return new Promise(function(resolve, reject) {
        var stream = fs.createWriteStream(filename);
        request(uri).pipe(stream).on('close', (data)=>{
            resolve(data)
        });
    })
}

exports.readDirFilesSync = function (path){
    let root = fs.readdirSync(path);
    let files = [];
	root.forEach(function(elem, index){
		var info = fs.statSync(path + "/" + elem)
		if(!info.isDirectory()){
			files.push(elem)
		}
    })
    return files;
}