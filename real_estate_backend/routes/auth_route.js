import express from "express";
import signup from "../controllers/auth_controller.js";

const route = express.Router();

route.get("/", (req, res) => {
  res.json({ route: "auth route" });
});

route.post("/signup", signup);

export default route;
