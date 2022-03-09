import request from "supertest"
import app from "../app"
import { createToken } from "../services/user.service"

const user = {
    username: "username",
    email: "email@email.com",
    password: "password",
};

const anotherUser = {
    username: "another_username",
    email: "another_email@email.com",
    password: "password",
}

describe("User should", () => {
    let token: string;

    it("register", async () => {
        const result = await request(app).post("/user/auth/register").send(user);
    
        expect(result.status).toBe(200);
        expect(result.body.user.id).toBeTruthy();
        expect(result.body.user.username).toEqual(user.username);
        expect(result.body.user.email).toEqual(user.email);
        expect(result.body.token).toBeTruthy();
    });

    it("not register because user already exists", async () => {
        const result = await request(app).post("/user/auth/register").send(user);
    
        expect(result.status).toBe(400);
        expect(result.body.message).toEqual("User already exists");
    });

    it("login", async () => {
        const result = await request(app).post("/user/auth/login").send(user);

        expect(result.status).toBe(200);
        expect(result.body.user.id).toBeTruthy();
        expect(result.body.user.username).toEqual(user.username);
        expect(result.body.user.email).toEqual(user.email);
        expect(result.body.token).toBeTruthy();

        token = await createToken(result.body.user.id);
    });

    it("not login because user doesn't exist", async () => {
        const result = await request(app).post("/user/auth/login").send(anotherUser);
        
        expect(result.status).toBe(400);
        expect(result.body.message).toEqual("User doesn't exist");    
    });

    it("get current user", async () => {
        const result = await request(app).get("/user/current")
            .set("Authorization", `Bearer ${token}`)
            .send();
        
        expect(result.status).toBe(200);
        expect(result.body.user.id).toBeTruthy();
        expect(result.body.user.username).toEqual(user.username);
        expect(result.body.user.email).toEqual(user.email);
    });
})