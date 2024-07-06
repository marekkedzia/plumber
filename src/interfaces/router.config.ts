import {Opaque} from "ts-opaque";
import {config} from "../config";
import {throwPlumberError} from "../utils/error.message";

type RouterPath = Opaque<string, "router-path">

function RouterPath(path: string): RouterPath {
    const routerPathRegex = config.routerPathRegex;

    if (!routerPathRegex.test(path)) {
        throwPlumberError(`Invalid router path: ${path}`)
    }

    return path as RouterPath;
}

type RouterConfig = {
    path: RouterPath;
}

export {RouterConfig, RouterPath};
