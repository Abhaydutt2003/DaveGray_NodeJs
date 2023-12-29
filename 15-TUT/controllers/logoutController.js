const User = require("../models/User");

const handleLogout = async (req, res) => {
  //on client(frontend), delete the token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;
  //Check if refresh Token in db
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }
  //Delete the token from the db, and also update the user
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  return res.sendStatus(204);
};

module.exports = { handleLogout };

//204 means that the client has succeded but does not need to navigate
