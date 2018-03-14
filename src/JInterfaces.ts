/** interface for import routes from a list */
export interface IRoute {
  route: string;
  handler?: Function;
  routes?: IRoute[];
  isParam?: boolean;
}
/** interface to assign object inside router */
export interface IRouteObject {
  handler?: Function;
  isParam?: boolean;
  request?: IRouteRequest;
}
/** interface for route request */
export interface IRouteRequest {
  route: string;
  url: string;
  params: { [key: string] : string }
}