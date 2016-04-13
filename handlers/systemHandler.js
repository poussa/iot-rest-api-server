var os = require('os');

var routes = function(req, res) {
    info(req, res);

    function info(req, res) {
        console.log("sysHandler");
        var system = {};

        system.hostname = os.hostname();
        system.type = os.type();
        system.platform = os.platform();
        system.arch = os.arch();
        system.release = os.release();
        system.uptime = os.uptime();
        system.loadavg = os.loadavg();
        system.totalmem = os.totalmem();
        system.freemem = os.freemem();
        system.cpus = os.cpus();
        system.networkinterfaces = os.networkInterfaces();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(system));
    }

}
module.exports = routes;
