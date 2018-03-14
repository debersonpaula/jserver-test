/** interface for import routes from a list */
export interface IRoute {
  route: string;
  handler?: Function;
  routes?: IRoute[];
}
/** interface to assign object inside router */
export interface IRouteObject {
  handler?: Function;
}