//emulating a db
const usersDb = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

//handle adding new user
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "usename and password are required" });
  }
  //check for duplicates
  const duplicate = usersDb.users.find((person) => person.username == user);
  //conflict
  if (duplicate) return res.sendStatus(409);


  //generete the newUser
  bcrypt.hash(pwd, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    newUser = { username: user, password: hash };
    usersDb.setUsers([...usersDb.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDb.users)
    );
    return res.status(201).json({ message: `New user created with ${user}` });
  });
  
};

module.exports = { handleNewUser };
