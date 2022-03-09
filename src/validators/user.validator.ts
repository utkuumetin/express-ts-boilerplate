import { body } from "express-validator"

export const userAuthRegisterValidator = [
    body("email").exists().isEmail().withMessage("Email must be valid"),
    body("username").exists().isString().isLength({min: 6, max: 12}).withMessage("Username must be min. 6, max. 12 char long string"),
    body("password").exists().isString().isLength({min: 6, max: 12}).withMessage("Password must be min. 6, max. 12 char long string"),
];

export const userAuthLoginValidator = [
    body("email").exists().isEmail().withMessage("Email must be valid"),
    body("password").exists().isString().withMessage("Password must be string"),
];