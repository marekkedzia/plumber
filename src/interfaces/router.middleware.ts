import {ParameterizedRequest} from "./parameterized.request";

type Pipe<T> = {
    type: "pipe";
    handle: (request: ParameterizedRequest<T>) => void | Promise<void>;
}

type Filter<T> = {
    type: "filter";
    handle: (request: ParameterizedRequest<T>) => T | Promise<T>;
}
type RouterMiddleware<T> = Pipe<T> | Filter<T>;

export {RouterMiddleware, Pipe, Filter};
