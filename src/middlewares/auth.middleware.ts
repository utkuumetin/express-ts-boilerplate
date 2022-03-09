import { Request, Response, NextFunction } from "express"
import ApiError from "../error/ApiError"
import wrapper from "../error/ApiErrorWrapper"
import jwt from "jsonwebtoken"

export const authMiddleware = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers["authorization"]?.split(" ")[1];
        const data = jwt.verify(token!, process.env.AUTH_SECRET!) as { id: number };
        
        req.user = data.id;
        
        next();
    } catch{
        throw new ApiError(401, "Unauthorized")
    }
});