import express from "express";
import { test, updateUser } from "../controllers/user_controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ route: "user route" });
});

router.get("/test", test);
router.post("/update/:id", updateUser);

export default router;
