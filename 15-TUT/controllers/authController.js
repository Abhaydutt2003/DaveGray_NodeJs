const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "usename and password are required" });
  }
  //find the user
  const foundUser = await User.findOne({username:user}).exec();
  if (!foundUser) return res.status(401).json({ message: "User not found" });
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    /**
     * create a jwt
     * we will not use the password as the payload , will hurt the security
     * Also , there is no need to send the roles in the refresh token,it is only to get the refresh token
     */
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: Object.values(foundUser.roles),
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "50s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //saving refresh token with the current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    //set security:true in production
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken });
  } else {
    return res.sendStatus(401);
  }
};

module.exports = { handleLogin };
