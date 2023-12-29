//use spread operator, it allows as many arguments as needed
const verifyRoles =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req?.roles){
      return res.sendStatus(401);
    } 
    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.roles);
    //do this to find weather the role is valid or not
    const result = req.roles
      .map((role) => {
        return rolesArray.includes(role);
      })
      .find((val) => {
        return val === true;
      });
    if (!result) return res.sendStatus(401);
    next(); //is a middleware
  };

module.exports = verifyRoles;