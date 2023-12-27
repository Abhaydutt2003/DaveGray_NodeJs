const userDb = {
  users: require("../models/users.json"),
  setUsers: function (users) {
    this.users = users;
    return;
  },
};
// TODO: Look into why exactly we are using normal function instead of a arrow function

const jwt = require("jsonwebtoken");
require("dotenv").config();

//for the frontend part , the token should be stored in the memory.
//meaning the token should not be acessed by javascript

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  //find the user on the basis of refreshToken
  const foundUser = userDb.users.find((person) => {
    return person.refreshToken == refreshToken;
  });
  if (!foundUser) return res.sendStatus(403);
  //evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: Object.values(foundUser.roles),
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    return res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
