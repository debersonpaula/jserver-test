"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
// import {TJNode} from './JTree';
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
class TJServer {
    /** Create TJServer instance */
    constructor() {
        this._server = http.createServer(this._listener.bind(this));
        this._routes = {};
        this._controllers = {};
    }
    /** Start server and listen to port */
    listen(port) {
        this._server.listen(port);
    }
    /** Event Handler */
    on(event, callback) {
        this._server.on(event, callback);
    }
    /** Import Routes from list */
    addRoutes(routesJSON) {
        this._routes = createRoutes(routesJSON, this._controllers);
        console.log(this._routes);
    }
    /** Import Controllers from list */
    addControllers(controllers) {
        for (const i in controllers) {
            for (const j in controllers[i]) {
                this._controllers[i + '/' + j] = controllers[i][j];
            }
        }
    }
    /** Listener to createServer */
    _listener(req, res) {
        if (req.url != '/favicon.ico') {
            // write standard header
            res.writeHead(200, { 'Content-Type': 'application/json' });
            // // transform url to array
            // const obj = this._getRouteObject(req.url || '', req);
            // if (obj) {
            //   const func = obj.handler || function() { return {}};
            //   // write results
            //   res.write(JSON.stringify( func(obj.request) ));
            // }
            getRoute(transformURL(req.url || ''), this._routes);
        }
        res.end();
    }
}
exports.TJServer = TJServer;
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** create route object from JSON route object */
function createRoute(routeJSON, ctls) {
    const route = {};
    route.handler = ctls[routeJSON['@handler']];
    route.params = routeJSON['@params'];
    // route.routes = {};
    return route;
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** create routes from JSON */
function createRoutes(routesJSON, ctls) {
    const routes = {};
    for (const i in routesJSON) {
        if (i.charAt(0) != '@') {
            // create route object
            const route = createRoute(routesJSON[i], ctls);
            // create child routes
            route.routes = createRoutes(routesJSON[i], ctls);
            // add to routes
            routes[i] = route;
        }
    }
    return routes;
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** transform URL string to array and remove the first element */
function transformURL(url) {
    return url.split('/').slice(1);
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
// /** default value for path that does no exist */
// function errorDoesNotExist(): IRouteObject {
//   return {
//     handler: function () {
//       return { error: 'THIS PATH DOES NOT EXIST'};
//     }
//   };
// }
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
function getRoute(url, routes) {
    console.log('getRoute', url);
    // set initial data
    let current = routes, knownRoutes = 0, urlMapped = '', knownRoute = '';
    // loop for known routes
    for (const i in url) {
        const routeName = url[i];
        const route = current[routeName];
        if (route) {
            current = route.routes || {};
            knownRoutes++;
            urlMapped += '/' + routeName;
            knownRoute = routeName;
        }
        else {
            break;
        }
    }
    // loop for unknown routes (ex.: parameters or unmaped routes)
    if (knownRoutes != url.length) {
        for (let i = (knownRoutes - 1); i < url.length; i++) {
        }
    }
    const result = {
        knownRoutes, urlMapped, knownRoute, route: current
    };
    console.log('result', result);
    // return the last route
    // return route;
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/ 
