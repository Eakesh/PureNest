import User from "../model/user_model.js";
import bcryptjs from "bcryptjs";

export default async function signup(req, res) {
  const { username, email, password } = req.body;
  const hashedpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    return res
      .status(200)
      .json({ username: username, email: email, password: hashedpassword });
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000)
      return res
        .status(403)
        .json({ success: false, message: "User Already Exists!" });
    return res
      .status(422)
      .json({ success: false, message: "operation failed" });
  }
}
