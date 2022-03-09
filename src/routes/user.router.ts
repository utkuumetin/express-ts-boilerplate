import { Router } from "express"
import wrapper from "../error/ApiErrorWrapper"
import validate from "../middlewares/validator.middleware"

import {
    userAuthRegisterController,
    userAuthLoginController,
    currentUserController
} from "../controllers/user.controller"

import {
    userAuthRegisterValidator,
    userAuthLoginValidator
} from "../validators/user.validator"

import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router();

router.get("/current", authMiddleware, wrapper(currentUserController));

router.post("/auth/register", validate(userAuthRegisterValidator), wrapper(userAuthRegisterController));
router.post("/auth/login", validate(userAuthLoginValidator), wrapper(userAuthLoginController));

export default router;