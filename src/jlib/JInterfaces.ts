export type THandler = (req: TRouteRequest) => void;
export type TRoutes = { [key: string] : TRoute };
export type TControllers = { [key: string] : THandler };

export interface TRoute {
  handler?: THandler,
  params?: TRouteParams,
  routes? : TRoutes,
};

export interface TRouteParams {
  paths? : string[];
  queries? : string[];
  headers? : string[];
}

export interface TRouteRequest {
  route: string;
  url: string;
  params: { [key: string] : any }
}