import * as http from 'http';
import {IRoute, IRouteObject, IRouteRequest} from './JInterfaces';
import {TJNode} from './JTree';
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
export class TJServer {
  private _server: http.Server;
  private _routes: TJNode<IRouteObject>;

  /** Create TJServer instance */
  constructor() {
    this._server = http.createServer(this._listener.bind(this));
    this._routes = new TJNode;
  }

  /** Start server and listen to port */
  public listen(port: number) {
    this._server.listen(port);
  }

  /** Import Routes from list */
  public addRoutes(value: IRoute[]) {
    this._addRoutes(value, this._routes);
  }

  set defaultRoute(value: IRouteObject) {
    this._routes.object = value;
  }

  /** Add Routes from list */
  private _addRoutes(value: IRoute[], parent: TJNode<IRouteObject>) {
    for (const i in value) {
      const newRoute = this._addRoute(value[i], parent);
      if (value[i].routes) {
        this._addRoutes(value[i].routes || [], newRoute);
      }
    }
  }

  /** Add One Route */
  private _addRoute(value: IRoute, parent: TJNode<IRouteObject>): TJNode<IRouteObject> {
    return parent.add(value.route, transformRoute(value));
  }

  /** Listener to createServer */
  private _listener(req: http.IncomingMessage, res: http.ServerResponse) {
    if (req.url != '/favicon.ico') {
      // write standard header
      res.writeHead(200, {'Content-Type': 'application/json'});
      // transform url to array
      const obj = this._getRouteObject(req.url || '', req);
      if (obj) {
        const func = obj.handler || function() { return {}};
        // write results
        res.write(JSON.stringify( func(obj.request) ));
      }
    }
    res.end();
  }

  private _getRouteObject(urlstr: string, req: http.IncomingMessage): IRouteObject {
    // transform url string to array
    const url = transformURL(urlstr);
    // create request to attach in response
    const request : IRouteRequest = {
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

        const queries = route.object.params ? route.object.params.queries : false;
        const paths = route.object.params ? route.object.params.paths : false;

        let node: any = {};

        if (queries || paths) {

        } else {
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
              request.params[ paramsHeader[j] ] = req.headers[ paramsHeader[j] ];
            }
          }

        // if not exists, throw error
        } else {
          return errorDoesNotExist();
        }
      }
      routeObject = route.object;
    }
    return Object.assign({}, routeObject, {request});
  }

}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** transform IRoute to IRouteObject */
function transformRoute(route: IRoute): IRouteObject {
  return {
    handler: route.handler,
    params: route.params,
  };
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** transform URL string to array and remove the first element */
function transformURL(url: string) {
  return url.split('/').slice(1);
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** default value for path that does no exist */
function errorDoesNotExist(): IRouteObject {
  return {
    handler: function () {
      return { error: 'THIS PATH DOES NOT EXIST'};
    }
  };
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
function getKnownRoute(url: string[], routes: TJNode<IRouteObject>) {
  // get initial route
  let route = routes;
  // loop for known routes
  for (const i in url) {
    const node = route.nodes[url[i]];
    if (node) {
      route = node;
    } else {
      break;
    }
  }
  // return the last route
  return route;
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/