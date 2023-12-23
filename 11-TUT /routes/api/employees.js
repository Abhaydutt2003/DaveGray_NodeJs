const express = require("express");
const router = express.Router();
const path = require("path");

//import the controller
const employeeController = require("../../controllers/employeeController");
const verifyJWT = require('../../middleware/verifyJWT');


router
  .route("/")
  .get(verifyJWT,employeeController.getAllEmployees)
  .post(employeeController.createNewEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
