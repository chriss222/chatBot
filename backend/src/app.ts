import morgan from "morgan";
import appRouter from "./routes/index.js";
import express from "express";
import { config } from "dotenv"

config();
const app = express();

//middlewares
app.use(express.json());

//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
