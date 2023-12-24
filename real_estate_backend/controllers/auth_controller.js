import User from "../model/user_model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

export async function signin(req, res) {
  console.log("hello");
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const password_auth = bcryptjs.compareSync(password, user?.password);
  if (!password_auth) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  //acts like a session storage
  const { password: pass, ...userrest } = user._doc;
  res.cookie("access_token", token, { httpOnly: true }).status(200).json({
    success: true,
    message: "Logged in Successfully",
    user: userrest,
  });
}

export async function authenticate(req, res) {
  console.log("get hit bro in the matrix");
  if (req.cookies.access_token !== undefined) {
    return res.status(200).json({ message: "user authenticated" });
  }
  return res.status(401).json({ message: "user not authenticated" });
}

export async function logout(req, res) {
  res.clearCookie("access_token");
  return res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
}
