import * as http from 'http';
import {IRoute, IRouteObject /*IRoutes, IAddRoute*/} from './JInterfaces';
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
      const url = transformURL(req.url || '');
      const obj = this._getRouteObject(url);
      if (obj) {
        const func = obj.handler || function() { return {}};
        // write results
        res.write(JSON.stringify( func() ));
      }
    }
    res.end();
  }

  private _getRouteObject(url: string[]): IRouteObject {
    if (!url[0]) {
      return this._routes.object;
    } else {
      let route = this._routes;
      for (const i in url) {
        const node = route.nodes[url[i]];
        if (node) {
          route = node;
        } else {
          return errorDoesNotExist();
        }
      }
      return route.object;
    }
  }

}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
function transformRoute(route: IRoute): IRouteObject {
  return {
    handler: route.handler
  };
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
function transformURL(url: string) {
  return url.split('/').slice(1);
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
function errorDoesNotExist(): IRouteObject {
  return {
    handler: function () {
      return { error: 'THIS PATH DOES NOT EXIST'};
    }
  };
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/