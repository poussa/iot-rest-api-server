#!/usr/bin/env node
var path = require('path');
var rest;
try {
  rest = require('iot-rest-api-server');
} catch (err) {
  rest = require('../index.js');
}
var fs = null;
var args = process.argv.slice(2);
var options = {
    help: false,
    verbose: false,
    https: false,
    port: 8000,
    cors: false
};

const usage = "usage: iot-rest-api-server [options]\n" +
"options: \n" +
"  -h, --help \n" +
"  -v, --verbose \n" +
"  -p, --port <number>\n" +
"  -s, --https \n" +
"  -c, --cors \n";

for (var i = 0; i < args.length; i++) {
    var arg = args[i];

    switch(arg) {
        case '-h':
        case '--help':
            options.help = true;
            break;
        case '-v':
        case '--verbose':
            options.verbose = true;
            break;
        case '-s':
        case '--https':
            options.https = true;
            break;
        case '-p':
        case '--port':
            var num = args[i + 1];
            if (typeof num == 'undefined') {
                console.log(usage);
                process.exit(0);
            }
            options.port = parseInt(num);
            break;
        case '-c':
        case '--cors':
            options.cors = true;
            break;
    }
}

if (options.help == true) {
    console.log(usage);
    process.exit(0);
}

if (Number.isInteger(options.port) == false) {
    console.log(usage);
    process.exit(0);
}

var httpsOptions = {key: null, cert: null};
if (options.https == true) {
    fs = require('fs');
    var configPath = path.resolve(path.join(__dirname, "..", "config"));
    httpsOptions.key = fs.readFileSync(path.join(configPath, 'private.key'));
    httpsOptions.cert = fs.readFileSync(path.join(configPath, 'certificate.pem'));
}

rest.server.use("/api/oic", rest.ocf);
rest.server.use("/api/system", rest.system);

// systemd socket activation support
if (process.env.LISTEN_FDS) {
    // The first passed file descriptor is fd 3
    var fdStart = 3;
    options.port = {fd: fdStart};
}

rest.server.start(options, httpsOptions);
