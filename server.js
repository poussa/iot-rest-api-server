var http, https;
var router = require('./router');
var routes = {};

function start(config, options) {
    function onRequest(req, res) {
        if (config.cors) {
            // Allow cross origin requests
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        }
        router.route(routes, req, res);
    }
    if (config.https) {
        https = require('https');
        https.createServer(options, onRequest).listen(config.port, '127.0.0.1');
    }
    else {
        http = require('http');
        http.createServer(onRequest).listen(config.port, '127.0.0.1');
    }
    console.log("API server started on " + new Date().toISOString()
        + " [port: " + config.port + ", https: " + config.https + "]");
}

function use(pathname, handler) {
    if (typeof handler === 'function')
        routes[pathname] = handler;
    else
        console.log("Server: handler is not a function");
}

exports.use = use;
exports.start = start;
