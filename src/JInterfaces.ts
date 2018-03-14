/** interface for import routes from a list */
export interface IRoute {
  route: string;
  handler?: (req: IRouteRequest) => void;
  routes?: IRoute[];
  params?: IRouteParams;
}

/** interface to assign object inside router */
export interface IRouteObject {
  handler?: Function;
  // isParam?: boolean;
  request?: IRouteRequest;
  params?: IRouteParams;
}

/** interface for param type */
export interface IRouteParams {
  paths? : string[];
  queries? : string[];
  headers? : string[];
}

/** interface for route request */
export interface IRouteRequest {
  route: string;
  url: string;
  params: { [key: string] : any }
}