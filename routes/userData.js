var express = require('express');
var router = express.Router();
const usersBL = require('../models/usersBL');

router.get('/', async function(req, res, next) {
  if(!req.session.admin)
  {
    res.redirect('/');
  }
  else
  {
    res.render('userData',{update:false});
  }
  
});
router.get('/:id', async function(req, res, next) {
  if(!req.session.admin)
  {
    res.redirect('/');
  }
  else
  {
    let userId = req.params.id;
    let userData = await usersBL.getUserById(userId);
    res.render('userData',{update:true,user:userData});
  }

});
router.post('/updateUser', async function(req, res, next) {
    let userObj = {"id":req.body.userId,"username":req.body.username,"password":req.body.password,"transactions":req.body.transactions};
    let userId =req.body.userId;
    await usersBL.updateUser(userObj,userId);
    res.redirect('/usersManagement');
});
router.post('/addUser', async function(req, res, next) {
  let date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  let userObj = {"username":req.body.username,"password":req.body.password,"transactions":req.body.transactions,"createdData":date};
  await usersBL.saveUser(userObj);
  res.redirect('/usersManagement');
});

module.exports = router;
