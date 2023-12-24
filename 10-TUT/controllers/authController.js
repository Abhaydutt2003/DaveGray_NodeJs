//emulating a db
const usersDb = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
    return;
  },
};

const bcrypt = require("bcrypt");

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
  //evaluate password;
  //console.log(pwd,foundUser.password);
  //console.log(user,foundUser);
  bcrypt.compare(pwd, foundUser.password, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (result) {
      return res.json({ message: `User ${user} is logged in` });
    } else {
      return res.sendStatus(401);
    }
  });

  // console.log(foundUser);
  // const match = await bcrypt.compare(pwd,foundUser.password);
  // if(match){
  //     return res.json({"message":`User ${user} is logged in`});
  // }else{
  //     return res.sendStatus(401);
  // }
};

module.exports = { handleLogin };
