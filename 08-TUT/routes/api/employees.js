const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};
data.employees = require("../../data/employees.json");

router
  .route("/")
  .get((req, res) => {
    return res.json(data.employees);
  })
  .post((req, res) => {
    return res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    return res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    })
  })
  .delete((req,res)=>{
    return res.json({"id":req.body.id});
  });


  

router.route('/:id')
   .get((req,res)=>{
    return res.json({'id':req.params.id});
   })  

module.exports = router;
