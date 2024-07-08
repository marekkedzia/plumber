import {Router, Request, Response, NextFunction} from 'express';
import {RouterConfig} from "./interfaces/router.config";
import {ParameterizedRequest} from "./interfaces/parameterized.request";
import {RouterMiddleware} from "./interfaces/router.middleware";
import {RouterCustomParameters} from "./interfaces/router.custom.parameters";
import {config} from "./config";
import {HttpMethod} from "./interfaces/http.methods";

class PlumberRouter<T> {
    router: Router;

    constructor(private routerConfig: RouterConfig) {
        this.router = Router();
    }

    private registerRoute(method: HttpMethod, pipesAndFilters: RouterMiddleware<T>[], customParameters?: RouterCustomParameters) {
        const path = customParameters?.path || this.routerConfig.path;
        const methodStatusCode = config[`${method}StatusCode`];

        this.router[method](path,
            // @ts-ignore
            async (req: ParameterizedRequest<T>, _: Response, next: NextFunction) => {
                for (const middleware of pipesAndFilters) {
                    if (middleware.type === "pipe") {
                        await middleware.handle(req);
                    } else if (middleware.type === "filter") {
                        req.parameter = await middleware.handle(req);
                    }
                }
                next();
            }, (req: Request, res: Response) => {
                res.status(methodStatusCode).json(req.body);
            });
    }

    register(method: HttpMethod, pipesAndFilters: RouterMiddleware<T>[], customParameters?: RouterCustomParameters) {
        this.registerRoute(method, pipesAndFilters, customParameters);
    }
}

export {PlumberRouter};
