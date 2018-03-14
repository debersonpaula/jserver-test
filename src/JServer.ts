import * as http from 'http';
import {IRoute, /*IRoutes, IAddRoute*/} from './JInterfaces';
import {TJNode} from './JTree';
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
export class TJServer {
  private _server: http.Server;
  private _routes: TRoute;

  /** Create TJServer instance */
  constructor() {
    this._server = http.createServer(this._listener);
    this._routes = new TRoute({});
  }

  /** Start server and listen to port */
  listen(port: number) {
    this._server.listen(port);
  }

  /** Add Routes from list */
  routes(value: IRoute[]) {
    for (const i in value) {

    }
  }
  /** Add One Route */
  route(value: IRoute) {

  }

  /** Listener to createServer */
  private _listener(req: http.IncomingMessage, res: http.ServerResponse) {
    if (req.url != '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({name: 'Test'}));
    }
    res.end();
  }

}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** Routes */
// class TRoutes implements IRoutes {
//   _segments: { [s: string]: IRoute };

//   constructor() {
//     this._segments = {};
//   }

//   add(value: IAddRoute) {
//     const newRoute = new TRoute;
//   }
// }
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** Route */
class TRoute extends TJNode {
  
  constructor(route: IRoute) {
    super(route);
  }

  get route(): IRoute {
    return this._object;
  }
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/