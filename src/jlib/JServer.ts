import * as http from 'http';
// import {IRoute, IRouteObject, IRouteRequest} from './JInterfaces';
import {TRoute, TRoutes, TControllers, TRouteRequest} from './JInterfaces';
// import {TJNode} from './JTree';
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
export class TJServer {
  private _server: http.Server;
  // private _routes: TJNode<IRouteObject>;
  private _routes: TRoutes;
  private _controllers: TControllers;
  

  /** Create TJServer instance */
  constructor() {
    this._server = http.createServer(this._listener.bind(this));
    this._routes = {};
    this._controllers = {};
  }

  /** Start server and listen to port */
  public listen(port: number) {
    this._server.listen(port);
  }

  /** Event Handler */
  public on(event: any, callback: any) {
    this._server.on(event, callback);
  }

  /** Import Routes from list */
  public addRoutes(routesJSON: any) {
    this._routes = createRoutes(routesJSON, this._controllers);

    console.log(this._routes);
  }

  /** Import Controllers from list */
  public addControllers(controllers: any) {
    for (const i in controllers) {
      for (const j in controllers[i]) {
        this._controllers[i + '/' + j] = controllers[i][j];
      }
    }
  }

  /** Listener to createServer */
  private _listener(req: http.IncomingMessage, res: http.ServerResponse) {
    if (req.url != '/favicon.ico') {
      // write standard header
      res.writeHead(200, {'Content-Type': 'application/json'});
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

  // private _getRouteObject(urlstr: string, req: http.IncomingMessage): IRouteObject {
  //   // transform url string to array
  //   const url = transformURL(urlstr);
  //   // create request to attach in response
  //   const request : IRouteRequest = {
  //     route: '',
  //     url: urlstr,
  //     params: {}
  //   };
  //   // define first route
  //   let routeObject = this._routes.object;
  //   if (url[0]) {
  //     // check sequence of url
  //     let route = this._routes;
  //     for (const i in url) {

  //       const queries = route.object.params ? route.object.params.queries : false;
  //       const paths = route.object.params ? route.object.params.paths : false;

  //       let node: any = {};

  //       if (queries || paths) {

  //       } else {
  //         node = route.nodes[url[i]];
  //       }

  //       // get node defined by url
  //       //const node = route.nodes[url[i]];
  //       // if node exists go to the next node
  //       if (node) {
  //         // assign next route
  //         route = node;
  //         // define name of the route
  //         request.route = url[i];
  //         // get params in headers
  //         if (node.object.params) {
  //           const paramsHeader = node.object.params.headers || [];
  //           for (const j in paramsHeader) {
  //             request.params[ paramsHeader[j] ] = req.headers[ paramsHeader[j] ];
  //           }
  //         }

  //       // if not exists, throw error
  //       } else {
  //         return errorDoesNotExist();
  //       }
  //     }
  //     routeObject = route.object;
  //   }
  //   return Object.assign({}, routeObject, {request});
  // }

}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** create route object from JSON route object */
function createRoute(routeJSON: any, ctls: TControllers): TRoute {
  const route: TRoute = {};
  route.handler = ctls[ routeJSON['@handler'] ];
  route.params = routeJSON['@params'];
  // route.routes = {};
  return route;
}
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/** create routes from JSON */
function createRoutes(routesJSON: any, ctls: TControllers): TRoutes {
  const routes : TRoutes = {};
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
function transformURL(url: string) {
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
function getRoute(url: string[], routes: TRoutes) {
  console.log('getRoute', url);
  // set initial data
  let current = routes,
      knownRoutes = 0,
      urlMapped = '',
      knownRoute = '';
  // loop for known routes
  for (const i in url) {
    const routeName = url[i];
    const route = current[routeName];
    if (route) {
      current = route.routes || {};
      knownRoutes++;
      urlMapped += '/' + routeName;
      knownRoute = routeName;
    } else {
      break;
    }
  }
  // loop for unknown routes (ex.: parameters or unmaped routes)
  if ( knownRoutes != url.length && url.length) {
    for (let i = (knownRoutes-1); i < url.length; i++) {

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