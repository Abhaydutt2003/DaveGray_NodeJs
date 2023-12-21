const data = {
  employees: require("../models/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  return res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.lastname || !newEmployee.firstname) {
    return res.json({ message: "First and last names are required" });
  }
  data.setEmployees([...data.employees, newEmployee]);
  return res.json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find((employee) => {
    return employee.id == parseInt(req.body.id);
  });
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee id ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  //big doubt???
  const filteredArray = data.employees.filter((emp) => {
    return emp.id !== parseInt(req.body.id);
  });
  const unsortedArray = [...filteredArray, employee];
  unsortedArray.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    } else {
      return -1;
    }
  });
  data.setEmployees(unsortedArray);
  return res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find((emp) => {
    return emp.id == parseInt(req.body.id);
  });
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee id ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter((emp) => {
    return emp.id != parseInt(req.body.id);
  });
  data.setEmployees([...filteredArray]);
  return res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find((emp) => {
    return emp.id == parseInt(req.params.id);
  });
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee id ${req.body.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  createNewEmployee,
  getEmployee,
};
