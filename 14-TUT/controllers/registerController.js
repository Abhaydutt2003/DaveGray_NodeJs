const User = require("../models/User");
const bcrypt = require("bcrypt");

//handle adding new user
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }
  //check for duplicates
  const duplicate = await User.findOne({ username: user }).exec();

  //conflict
  if (duplicate) return res.sendStatus(409);

  try {
    //encrpyt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    console.log(result);
    return res.status(201).json({ message: `new user created ${user}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
