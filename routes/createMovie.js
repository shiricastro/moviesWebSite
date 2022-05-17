var express = require('express');
var router = express.Router();
const moviesBL = require('../models/moviesBL');

router.get('/', async function(req, res, next) {
  let genres = await moviesBL.getGenres();
  res.render('createMovie', { genres:genres }); 
});

router.post('/saveMovie',  async function(req, res, next) {
   let name = req.body.name;
   let language = req.body.language;
   let genre = req.body.genre;
   if(!Array.isArray(genre)){
      let genresArray = [];
      genresArray.push(genre);
      genre = genresArray;
   }
   let obj={name:name,language:language,genres:genre}
   let fileMovies = await moviesBL.saveMovie(obj);
   if(fileMovies){
    let transactions = req.session.transactions;
    let userId = req.session.userId;
    let admin = req.session.admin;
    if(!admin){
      transactions = transactions -1;
      req.session.transactions = transactions;
      await moviesBL.updateUser(userId,transactions);
    }
    res.redirect('/menu');
    
   }else{
    res.send('Error');
   }

    
   
 });


module.exports = router;