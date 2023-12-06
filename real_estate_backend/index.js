import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import userRouter from "./routes/user_route.js";
import authRouter from "./routes/auth_route.js";

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
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  return res.json({ server: "up" });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
