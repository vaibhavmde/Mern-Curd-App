const express =  require('express');
const router = express.Router();
const Employee = require('../controllers/employeeController');

router.get('/',Employee.getEmployees)

router.get('/:id',Employee.getEmployee)

router.post('/',Employee.createEmployee)

router.put('/:id',Employee.updateEmployee)

router.delete('/:id',Employee.deleteEmployee)

module.exports = router;