import { AppControllerRoute, AppViewRoute, BullBoardQueues, ControllerHandlerReturnType, IServerAdapter, UIConfig } from '@bull-board/api/dist/typings/app';
import { Express } from 'express';
export declare class ExpressAdapter implements IServerAdapter {
    protected readonly app: Express;
    protected basePath: string;
    protected bullBoardQueues: BullBoardQueues | undefined;
    protected errorHandler: ((error: Error) => ControllerHandlerReturnType) | undefined;
    protected uiConfig: UIConfig;
    constructor();
    setBasePath(path: string): ExpressAdapter;
    setStaticPath(staticsRoute: string, staticsPath: string): ExpressAdapter;
    setViewsPath(viewPath: string): ExpressAdapter;
    setErrorHandler(handler: (error: Error) => ControllerHandlerReturnType): this;
    setApiRoutes(routes: AppControllerRoute[]): ExpressAdapter;
    setEntryRoute(routeDef: AppViewRoute): ExpressAdapter;
    setQueues(bullBoardQueues: BullBoardQueues): ExpressAdapter;
    setUIConfig(config?: UIConfig): ExpressAdapter;
    getRouter(): any;
}
