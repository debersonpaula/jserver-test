/** interface for route object */
export declare type THandler = (req: IRouteRequest) => void;
export interface TRoute {
    handler?: THandler;
    params?: IRouteParams;
    routes?: TRoutes;
}
export declare type TRoutes = {
    [key: string]: TRoute;
};
export declare type TControllers = {
    [key: string]: THandler;
};
/** interface for param type */
export interface IRouteParams {
    paths?: string[];
    queries?: string[];
    headers?: string[];
}
/** interface for route request */
export interface IRouteRequest {
    route: string;
    url: string;
    params: {
        [key: string]: any;
    };
}
