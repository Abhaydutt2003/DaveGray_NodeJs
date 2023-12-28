const express = require("express");
const router = express.Router();

//import the controller
const employeeController = require("../../controllers/employeeController");

//import roles
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/VerifyRoles");

//do not need to put the verifyRoles middleware in getAllEmp
//the user would already have a verified JWT,
router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeeController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeeController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
