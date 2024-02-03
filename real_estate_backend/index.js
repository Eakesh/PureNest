import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import userRouter from "./routes/user_route.js";
import authRouter from "./routes/auth_route.js";
import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MongoURI)
  .then(() => {
    console.log("Sucessfully Connected");
  })
  .catch((err) => {
    console.log("Failed to Connected", err);
  });

const PORT = 3000;
const app = express();
const Host_url = "http://192.168.29.204:5173";
const host = false;

const corsOptions = {
  origin: host ? Host_url : "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.get("/", (req, res) => {
  return res.json({ server: "up" });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
