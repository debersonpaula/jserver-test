"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const JTree_1 = require("./JTree");
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
class TJServer {
    /** Create TJServer instance */
    constructor() {
        this._server = http.createServer(this._listener.bind(this));
        this._routes = new JTree_1.TJNode;
    }
    /** Start server and listen to port */
    listen(port) {
        this._server.listen(port);
    }
    /** Import Routes from list */
    addRoutes(value) {
        this._addRoutes(value, this._routes);
    }
    set defaultRoute(value) {
        this._routes.object = value;
    }
    /** Add Routes from list */
    _addRoutes(value, parent) {
        for (const i in value) {
            const newRoute = this._addRoute(value[i], parent);
            if (value[i].routes) {
                this._addRoutes(value[i].routes || [], newRoute);
            }
        }
    }
    /** Add One Route */
    _addRoute(value, parent) {
        return parent.add(value.route, transformRoute(value));
    }
    /** Listener to createServer */
    _listener(req, res) {
        if (req.url != '/favicon.ico') {
            // write standard header
            res.writeHead(200, { 'Content-Type': 'application/json' });
            // transform url to array
            const url = transformURL(req.url || '');
            const obj = this._getRouteObject(url);
            if (obj) {
                const func = obj.handler || function () { return {}; };
                // write results
                res.write(JSON.stringify(func()));
            }
        }
        res.end();
    }
    _getRouteObject(url) {
        if (!url[0]) {
            return this._routes.object;
        }
        else {
            let route = this._routes;
            for (const i in url) {
                const node = route.nodes[url[i]];
                if (node) {
                    route = node;
                }
                else {
                    return errorDoesNotExist();
                }
            }
            return route.object;
        }
    }
}
exports.TJServer = TJServer;
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
function transformRoute(route) {
    return {
        handler: route.handler
    };
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
function transformURL(url) {
    return url.split('/').slice(1);
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
function errorDoesNotExist() {
    return {
        handler: function () {
            return { error: 'THIS PATH DOES NOT EXIST' };
        }
    };
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/ 
