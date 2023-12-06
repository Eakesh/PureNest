import express from "express";
import test from "../controllers/user_controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ route: "user route" });
});

router.get("/test", test);

export default router;
