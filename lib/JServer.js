"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
class TJServer {
    /** Create TJServer instance */
    constructor() {
        this._server = http.createServer(this._listener);
        this._routes = new TRoutes;
    }
    /** Start server and listen to port */
    listen(port) {
        this._server.listen(port);
    }
    /** Add Routes from list */
    routes(value) {
        for (const i in value) {
        }
    }
    /** Add One Route */
    route(value) {
    }
    /** Listener to createServer */
    _listener(req, res) {
        if (req.url != '/favicon.ico') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ name: 'Test' }));
        }
        res.end();
    }
}
exports.TJServer = TJServer;
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** Routes */
class TRoutes {
    constructor() {
        this._segments = {};
    }
    add(value) {
        const newRoute = new TRoute;
    }
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** Route */
class TRoute {
    constructor() { }
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/ 
