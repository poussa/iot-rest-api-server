var url = require('url');

function route(routes, req, res) {
    var info = url.parse(req.url, true);
    var handler = null;

    for (var key in routes) {
        if (info.pathname.startsWith(key)) {
            handler = routes[key];

            // Attach express style properties to req
            req.path = info.pathname.substr(key.length);
            req.originalUrl = info.href;
            req.query = info.query;
            break;
        }
    }

    if (typeof handler === 'function')
        handler(req, res);
    else {
        var msg = "No request handler for " + info.pathname;
        console.log(msg);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(msg);
    }
}

exports.route = route;
