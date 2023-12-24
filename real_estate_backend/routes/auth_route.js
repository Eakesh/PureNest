import express from "express";
import signup, {
  signin,
  authenticate,
  logout,
} from "../controllers/auth_controller.js";

const route = express.Router();

route.get("/", (req, res) => {
  res.json({ route: "auth route" });
});

route.post("/signup", signup);
route.post("/signin", signin);
route.get("/authenticate", authenticate);
route.get("/logout", logout);
export default route;
