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
            const obj = this._getRouteObject(req.url || '', req);
            if (obj) {
                const func = obj.handler || function () { return {}; };
                // write results
                res.write(JSON.stringify(func(obj.request)));
            }
        }
        res.end();
    }
    _getRouteObject(urlstr, req) {
        // transform url string to array
        const url = transformURL(urlstr);
        // create request to attach in response
        const request = {
            route: '',
            url: urlstr,
            params: {}
        };
        // define first route
        let routeObject = this._routes.object;
        if (url[0]) {
            // check sequence of url
            let route = this._routes;
            for (const i in url) {
                // check
                // if (route.object.params) {
                // }
                const queries = route.object.params ? route.object.params.queries : false;
                const paths = route.object.params ? route.object.params.paths : false;
                let node = {};
                if (queries || paths) {
                }
                else {
                    node = route.nodes[url[i]];
                }
                // get node defined by url
                //const node = route.nodes[url[i]];
                // if node exists go to the next node
                if (node) {
                    // assign next route
                    route = node;
                    // define name of the route
                    request.route = url[i];
                    // get params in headers
                    if (node.object.params) {
                        const paramsHeader = node.object.params.headers || [];
                        for (const j in paramsHeader) {
                            request.params[paramsHeader[j]] = req.headers[paramsHeader[j]];
                        }
                    }
                    // if not exists, throw error
                }
                else {
                    return errorDoesNotExist();
                }
            }
            routeObject = route.object;
        }
        return Object.assign({}, routeObject, { request });
    }
}
exports.TJServer = TJServer;
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
function transformRoute(route) {
    return {
        handler: route.handler,
        params: route.params,
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
