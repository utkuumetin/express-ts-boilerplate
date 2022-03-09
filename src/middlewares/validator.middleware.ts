import { ValidationChain, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
import wrapper from "../error/ApiErrorWrapper"
import ApiError from "../error/ApiError";

export default function validate(validations: ValidationChain[]) {
    return wrapper(async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all(validations.map(validation => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      throw new ApiError(400, errors.array()[0].msg)
    })
}