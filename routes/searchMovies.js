var express = require('express');
var router = express.Router();
const moviesBL = require('../models/moviesBL');

router.get('/', async function(req, res, next) {
  let languages = await moviesBL.getLanguages();
  let genres = await moviesBL.getGenres();
  res.render('searchMovies', {languages:languages,genres:genres }); 
});

router.get('/search', async function(req, res, next) {
  
  let transactions = req.session.transactions;
  let userId = req.session.userId;
  let admin = req.session.admin;
  if(!admin){
    transactions = transactions -1;
    req.session.transactions = transactions;
    await moviesBL.updateUser(userId,transactions);
  }

  let query = req.query;
  req.session.search = query;
  let filterdMovies = await moviesBL.getFilterdMovies(query);
  res.render('searchResult',{movies: filterdMovies}); 
});

router.get('/searchBack', async function(req, res, next) {
  if(req.session.search){
    let query = req.session.search;
    req.session.search = query;
    let filterdMovies = await moviesBL.getFilterdMovies(query);
    res.render('searchResult',{movies: filterdMovies}); 
  }else{
    res.render('searchMovies',{}); 
  }
   
  
});

module.exports = router;