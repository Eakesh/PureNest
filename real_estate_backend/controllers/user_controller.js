import bcryptjs from "bcryptjs";
import User from "../model/user_model.js";
export function test(req, res) {
  res.json({ message: "Hello World" });
}

export async function updateUser(req, res) {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
      req.body.username = req.body.username.split(" ").join("$#$");
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json({ success: true, user: { ...rest } });
  } catch (e) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
