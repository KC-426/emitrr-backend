const userSchema = require("../modal/user");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { username } = req.body;

    const findUser = await userSchema.findOne({ username });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { username: findUser.username },
      "kuldeep-secret-key",
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.loginUser = loginUser;
