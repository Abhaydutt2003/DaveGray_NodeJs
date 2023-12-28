const usersDb = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
    return;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  //on client(frontend), delete the token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;
  //Check if refresh Token in db
  const foundUser = usersDb.users.find((person) => {
    return person.refreshToken == refreshToken;
  });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }
  //Delete the token from the db, and also update the user
  const otherUsers = usersDb.users.filter((person) => {
    return person.refreshToken != foundUser.refreshToken;
  });
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDb.setUsers([...otherUsers, currentUser]);
  console.log(usersDb.users);
  await fsPromises.writeFile(
    path.join(__dirname,"..", "models", "users.json"),
    JSON.stringify(usersDb.users)
  );
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  return res.sendStatus(204);
};


module.exports = {handleLogout};

//204 means that the client has succeded but does not need to navigate
