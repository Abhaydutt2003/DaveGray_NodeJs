//emulating a db
const usersDb = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
    return;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
//To emulate a db
const fsPromises = require("fs").promises;

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "usename and password are required" });
  }
  //find the user
  const foundUser = usersDb.users.find((person) => {
    return (person.username == user);
  });
  if (!foundUser) return res.status(401).json({ message: "User not found" });
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //create a jwt
    //we will not use the password as the payload , will hurt the security
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "50s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //saving refresh token with the current user
    const otherUsers = usersDb.users.filter((person) => {
      return person.username != foundUser.username;
    });
    const currentUser = { ...foundUser, refreshToken };
    usersDb.setUsers([...otherUsers,currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDb.users)
    );
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
