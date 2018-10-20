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