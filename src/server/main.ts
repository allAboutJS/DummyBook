import express from "express";
// import helmet from "helmet";
import { resolve } from "path";
import ViteExpress from "vite-express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { handleLogin, handleSignUp } from "./controllers/auth.controller.js";
import { connectToDb } from "./config/db.config.js";

const app = express();
const port = parseInt(process.env.PORT || "3000");

app.use(cors());
// app.use(helmet());
app.use(express.static(resolve(process.cwd(), "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/api/register", handleSignUp);
app.post("/api/login", handleLogin);

ViteExpress.listen(app, port, async () => (await connectToDb(), console.log("Server is listening on port 3000...")));
