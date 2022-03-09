import bodyParser from "body-parser"
import express from "express"
import dotenv from "dotenv"
import router from "./routes/index"
import ApiErrorHandler from "./error/ApiErrorHandler"

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use("/", router);
app.use(ApiErrorHandler);

export default app;
