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
    let users = await usersBL.getUsers();
    res.render('usersManagement',{users});
  }
  
});
router.get('/deleteUser/:id', async function(req, res, next) {
    let userId = req.params.id;
    await usersBL.deleteUser(userId);
    res.redirect('/usersManagement');
});

module.exports = router;
