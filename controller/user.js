const userSchema = require("../modal/user");

const createUser = async (req, res) => {
  try {
    const { username } = req.body;

    const findUser = await userSchema.findOne({ username });
    if (findUser) {
      return res.status(500).json({ message: "User already exists!" });
    }

    const user = new userSchema({
      username,
    });

    const savedUser = await user.save();
    console.log(savedUser);
    return res
      .status(201)
      .json({ success: true, message: "New user created!", result: savedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error!");
  }
};

exports.createUser = createUser;
