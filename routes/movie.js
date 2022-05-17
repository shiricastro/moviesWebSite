var express = require('express');
var router = express.Router();
const moviesBL = require('../models/moviesBL');

router.get('/:id', async function(req, res, next) {
  let transactions = req.session.transactions;
  let userId = req.session.userId;
  let admin = req.session.admin;
  if(!admin){
    transactions = transactions -1;
    req.session.transactions = transactions;
    await moviesBL.updateUser(userId,transactions);
  }
  
  let movieId = req.params.id;
  let moviesData = await moviesBL.getMovieById(movieId);
  res.render('movie', {movie:moviesData }); 
});


module.exports = router;