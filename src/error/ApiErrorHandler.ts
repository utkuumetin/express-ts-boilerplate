import { NextFunction, Request, Response } from "express"
import ApiError from "./ApiError"

export default function ApiErrorHandler(err: Error, req: Request, res: Response, next: NextFunction){
    if(err instanceof ApiError) {
        return res.status(err.code).json({ message: err.message })
    }

    return res.status(500).json({ message: "Internal server error" })
}