var qs = require('query-string');
var request = require('request');

var __DEV__ = false;

function filterJSON(res) {
    return res.json();
}

function filterStatus(res) {
    if (__DEV__) {
        console.info(res);
    }
    if (res.status >= 200 && res.status < 300) {
        return res
    }
    else {
        let error = new Error(res.statusText);
        error.res = res;
        error.type = 'http';
        throw error;
    }
}

exports.get = function(url, params, options = {}, callback) {
    return new Promise(function (resolve, reject) {

        const {metaType = 'json'} = options;
        let headers = {
            'Accept': 'application/json'
        };

        if (metaType == 'json') {
            headers = {
                ...headers,
                'Content-Type': 'application/json'
            }
        }

        if (params) {
            url += `?${qs.stringify(params)}`;
        }

        if (__DEV__) {
            console.info(`GET: ${url}`);
        }
        request.get(url, function (error, response, data) {
            //console.log("result", data);
            if (data) {
                resolve(data);
            } else {
                reject(data);
            }
        });
    });
}

exports.post = function(url, body, options = {}) {
    return new Promise(function (resolve, reject) {
        const {metaType = 'json'} = options;
        let headers = {
            'Accept': 'application/json'
        };

        let form = JSON.stringify(body);

        if (metaType == 'json') {
            headers = {
                ...headers,
                'Content-Type': 'application/json'
            }
        }

        if (metaType == 'form') {
            form = qs.stringify(body);
            headers = {
                ...headers,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }

        if (__DEV__) {
            console.info(`POST: ${url}`);
            console.info(`body:`, body)
        }

        request.post({
            url: url,
            method: "POST",
            json: false,
            headers,
            body: form,
        }, function (error, response, data) {
            //console.log("result", data);
            if (data) {
                resolve(data);
            } else {
                reject(data);
            }
        });
    });
}
