import request from "supertest"
import app from "../app"

describe("App should", () => {
    it("run", async () => {
        const result = await request(app).get('/health').send();
        expect(result.status).toBe(200);
    })
})