export declare class TJServer {
    private _server;
    private _routes;
    private _controllers;
    /** Create TJServer instance */
    constructor();
    /** Start server and listen to port */
    listen(port: number): void;
    /** Event Handler */
    on(event: any, callback: any): void;
    /** Import Routes from list */
    addRoutes(routesJSON: any): void;
    addControllers(controllers: any): void;
    /** Listener to createServer */
    private _listener(req, res);
}
