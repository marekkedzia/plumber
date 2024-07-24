import {Opaque} from "ts-opaque";

type RouterPath = Opaque<string, "router-path">

function RouterPath(path: string): RouterPath {
    return path as RouterPath;
}

type RouterConfig = {
    path: RouterPath;
}

export {RouterConfig, RouterPath, };
