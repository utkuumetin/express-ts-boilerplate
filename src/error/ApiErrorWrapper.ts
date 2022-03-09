import { NextFunction, Request, Response } from "express";

type handlerFunction = (req: Request, res: Response, next: NextFunction) => any;

export default function wrapper(fn: handlerFunction) {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(fn(req, res, next)).catch(next)
    }
}