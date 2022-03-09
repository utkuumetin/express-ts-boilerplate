import { Request, Response } from "express"
import { 
    createUser, 
    findUser, 
    createToken, 
    getUserById 
} from "../services/user.service"
import ApiError from "../error/ApiError"

export async function userAuthRegisterController(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const user = await createUser(username, email, password).catch(error => {
        if(error.code == "P2002"){
            throw new ApiError(400, "User already exists")
        } throw new ApiError(500, error.message)
    });

    return res.status(200).json({ 
        token: createToken(user.id), 
        user: { id: user.id, username: user.username, email: user.email, type: user.type }
    })
}

export async function userAuthLoginController(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await findUser(email, password);
    if(!user) throw new ApiError(400, "User doesn't exist")

    return res.status(200).json({ 
        token: createToken(user.id), 
        user: { id: user.id, username: user.username, email: user.email, type: user.type }
    })
}

export async function currentUserController(req: Request, res: Response) {
    const id = req.user;

    const user = await getUserById(id);
    if(!user) throw new ApiError(400, "User doesn't exist")

    return res.status(200).json({
        user: { id: user.id, username: user.username, email: user.email, type: user.type }
    })
}