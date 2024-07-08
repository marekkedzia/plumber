import {ParameterizedRequest} from "./parameterized.request";

type Pipe<T> = {
    type: "pipe";
    handle: (request: ParameterizedRequest<T>) => void | Promise<void>;
}

type Filter<T> = {
    type: "filter";
    handle: (request: ParameterizedRequest<T>) => T | Promise<T>;
}

function Filter<T>(handle: (request: ParameterizedRequest<T>) => T | Promise<T>): Filter<T> {
    return {
        type: "filter",
        handle
    };
}

function Pipe<T>(handle: (request: ParameterizedRequest<T>) => void | Promise<void>): Pipe<T> {
    return {
        type: "pipe",
        handle
    };
}

type RouterMiddleware<T> = Pipe<T> | Filter<T>;

export {RouterMiddleware, Pipe, Filter};
