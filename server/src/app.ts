import express from "express";
import router from "./router.ts";
import cors from "cors";
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api", router);

export default app;
