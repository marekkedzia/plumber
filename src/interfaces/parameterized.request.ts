import {Request} from 'express'

type ParameterizedRequest<T> = { parameter: T } & Request;

export {ParameterizedRequest};
