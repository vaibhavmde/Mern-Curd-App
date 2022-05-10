const express = require('express');
const router =  express.Router();

router.get('/',(req,res,next) => {
  res.status(201).json({ message:'welcome to My server'});
});

router.get('/use',(req,res,next) => {
  res.status(201).send('hello there user');
})

router.post('/',(req,res,next) => {
  res.send(req.body);
})

router.get('*',(req,res,error) => {
  res.send('There is no such page you are looking for')
})
module.exports = router;