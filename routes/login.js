var express = require('express');
var router = express.Router();
const loginBL = require('../models/loginBL');

router.get('/', async function(req, res, next) {

  res.render('login' , { });
});

router.post('/getuserdetails',  async function(req, res, next) {
 //Send the data to the model...
  let username = req.body.username;
  let password = req.body.password;
  let answer = await loginBL.cheackUserData(username,password);
  if(answer.userId){
    req.session.transactions = answer.transactions;
    req.session.userId = answer.userId;
    req.session.admin = answer.admin;
    res.redirect('/menu');
  }else{
    res.send(answer.message);
  }
  
});



module.exports = router;