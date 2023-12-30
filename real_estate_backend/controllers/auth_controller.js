import User from "../model/user_model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function signup(req, res) {
  const { username, email, password } = req.body;
  const hashedpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedpassword,
    isOauth: false,
  });
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
  if (!user?.isOauth) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //acts like a session storage
    const { password: pass, ...userrest } = user._doc;
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Logged in Successfully",
      user: userrest,
    });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
}

export async function authenticate(req, res) {
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

export async function googleSignin(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    } else {
      if (user?.isOauth) {
        const { password: pass, ...userrest } = user._doc;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({
            success: true,
            message: "User logged in",
            user: userrest,
          });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Invalid credentials" });
      }
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function googleSignup(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(" ").join("$#$"),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
        isOauth: true,
      });
      await newUser.save();
      return res
        .status(200)
        .json({ success: true, message: "user signedup successfully" });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
