import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../client"

export function hashPassword(password: string): string{
    return bcrypt.hashSync(password, 14);
}

export function comparePasswords(password: string, hash: string | undefined): boolean{
    return bcrypt.compareSync(password, hash!);
}

export function createToken(id: number): string{
    return jwt.sign({id}, process.env.AUTH_SECRET!, { expiresIn: "24h" })
}

export async function createUser(username: string, email: string, password: string) {
    return await prisma.user.create({ data: { username, email, password: hashPassword(password) }})
}

export async function findUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email }});
    if(user?.id) if(comparePasswords(password, user?.password)) return user; else return null
}

export async function getUserById(id: number) {
    return await prisma.user.findUnique({ where: { id } })
}