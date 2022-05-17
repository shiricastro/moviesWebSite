var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
  if(!req.session.transactions)
  {
    res.redirect('/');
  }
  else
  {
    res.render('menu', { admin : req.session.admin });
  }
  
});




module.exports = router;