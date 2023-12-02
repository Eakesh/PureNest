import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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

app.get("/", (req, res) => {
  return res.json({ server: "up" });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
