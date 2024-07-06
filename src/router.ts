import {Router, Request, Response, NextFunction} from 'express';
import {RouterConfig} from "./interfaces/router.config";
import {ParameterizedRequest} from "./interfaces/parameterized.request";
import {RouterMiddleware} from "./interfaces/router.middleware";

class PlumberRouter<T> {
    router: Router;

    constructor(private routerConfig: RouterConfig) {
        this.router = Router();
    }

    private registerRoute(method: string, pipesAndFilters: RouterMiddleware<T>[]) {
        this.router[method](this.routerConfig.path, async (req: ParameterizedRequest<T>, _: Response, next: NextFunction) => {
            for (const middleware of pipesAndFilters) {
                if (middleware.type === "pipe") {
                    await middleware.handle(req);
                } else if (middleware.type === "filter") {
                    req.parameter = await middleware.handle(req) as T;
                }
            }
            next();
        }, (req: Request, res: Response) => {
            res.send(req.body);
        });
    }

    registerGet(pipesAndFilters: RouterMiddleware<T>[]) {
        this.registerRoute('get', pipesAndFilters);
    }

    registerPost(pipesAndFilters: RouterMiddleware<T>[]) {
        this.registerRoute('post', pipesAndFilters);
    }

    registerPut(pipesAndFilters: RouterMiddleware<T>[]) {
        this.registerRoute('put', pipesAndFilters);
    }

    registerDelete(pipesAndFilters: RouterMiddleware<T>[]) {
        this.registerRoute('delete', pipesAndFilters);
    }

    registerPatch(pipesAndFilters: RouterMiddleware<T>[]) {
        this.registerRoute('patch', pipesAndFilters);
    }
}

export {PlumberRouter};
