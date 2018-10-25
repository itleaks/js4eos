var request = require('request');
var fs = require('fs')
var archiver = require('archiver')

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

exports.archiveCode = function (sourcePath, dstFile) {
    return new Promise(function(resolve, reject) {
        // console.log(sourcePath, dstFile)
        var fileOutput = fs.createWriteStream(dstFile);
        var archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
        fileOutput.on('close', function () {
            // console.log(archive.pointer() + ' total bytes');
            if (archive.pointer() > 1024*1000) {
                reject("contract's size is too big and larger than 1M")
            }
            // console.log('archiver has been finalized and the output file descriptor has closed.');
            resolve(archive.pointer())
            // fs.unlinkSync(dstFile);
        });

        archive.pipe(fileOutput);
        archive.glob("*.cpp", { cwd: sourcePath }, { prefix: ''}); //include cpp files
        archive.glob("*.hpp", { cwd: sourcePath }, { prefix: ''}); //include hpp files
        archive.on('error', function(err){
            reject(err)
        });
        archive.finalize();
    })
}