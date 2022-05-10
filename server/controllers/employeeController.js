const Employee = require('../models/Employee');

const getEmployees = async(req,res) => {
  const emp = await Employee.find();
  if(!emp) return res.json({message:"No employee found"})
  res.json(emp);
}

const getEmployee = async(req,res) => {
  const emp = await Employee.findOne({EmpId:req.params.id}).exec();
  if(!emp) return res.json({message:`No employee matches with ${req.params.id}`})

  res.json(emp);
}

const createEmployee = async(req,res) => {
  const { Firstname,Lastname,EmpId,City} = req.body;
  if(!Firstname||!Lastname||!EmpId||!City) return res.status(400).json({ 'message': 'Firstname,Lastname,EmpID and City are required.' });
   
  try {
    // check for duplicate usernames in the db
  const duplicate = await Employee.findOne({ EmpId }).exec();
  if (duplicate) return res.sendStatus(409); //

  //create and store the new user
  const result = await Employee.create({
    Firstname,
    Lastname,
    EmpId,
    City   
});
 console.log(result);
 res.status(201).json({'success':result});
  } catch (error) {
    res.status(500).json({ 'message': error.message }); 
  }
}

const updateEmployee = async(req,res) => {
  if(!req.params.id)  return res.status(400).json({ 'message': 'EmpID is required.' }); 
  const emp = await Employee.findOne({EmpId:req.params.id}).exec();
  if(!emp) return res.status(204).json({'message':`No employee matches with ${req.params.id}`})
  
  if(req.body?.Firstname) emp.Firstname = req.body.Firstname;
  if(req.body?.Lastname) emp.Lastname = req.body.Lastname;
  if(req.body?.EmpId) emp.EmpId = req.body.EmpId;
  if(req.body?.City) emp.City = req.body.City; 
  const result = await emp.save();
  console.log(result); 
  res.json(emp)
}

const deleteEmployee = async(req,res) => {
  if(!req.params.id)  return res.status(400).json({ 'message': 'EmpID is required.' }); 
  const emp = await Employee.findOne({EmpId:req.params.id}).exec();
  if(!emp) return res.status(204).json({'message':`No employee matches with ${req.params.id}`})
  
  const result = await emp.deleteOne({EmpId:req.params.id});
  console.log(result); 
}

module.exports = {createEmployee,getEmployees,getEmployee,updateEmployee,deleteEmployee}