const User = require('../models/User');
const jwt = require("jsonwebtoken");

//for the frontend part , the token should be stored in the memory.
//meaning the token should not be acessed by javascript

const handleRefreshToken = async(req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt){
    console.log('there is no JWT cookie');
    return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;
  //find the user on the basis of refreshToken
  const foundUser = await User.findOne({refreshToken}).exec();
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
