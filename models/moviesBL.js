const moviesfileDal = require('../DALs/moviesFileDal');
const moviesWsDal = require('../DALs/moviesWSDal');
const usersFileDal = require('../DALs/usersFileDal');

const getGenres = async () =>
{
    let wsMovies = await moviesWsDal.getMovies();
    let data = wsMovies.data;
    let genresArr = [];
    data.forEach(x => {
        x.genres.forEach(genre=>{
            if(!genresArr.includes(genre)){genresArr.push(genre);}
        });
    });
    return genresArr;
}
const saveMovie = async (obj) =>
{
    let newArr = {"movies":[]};
    let fileData = await moviesfileDal.getMovies();
    let moviesFromFile = fileData.movies;
    // CHECK IF THERE IS ANY MOVIES ON newMovies.json
    if(moviesFromFile.length >0){
        let movies = moviesFromFile.sort(function(a,b){return a.id - b.id});
        let lastId = movies[movies.length-1].id;
        obj.id = lastId + 1;
        movies.push(obj);
        newArr.movies = movies;
    }else{   
        let wsData = await moviesWsDal.getMovies();
        let moviesFromWs = wsData.data;
        moviesFromWs.sort(function(a,b){return a.id - b.id});
        let lastId = moviesFromWs[moviesFromWs.length-1].id;
        obj.id = lastId + 1;
        newArr.movies.push(obj)
    }
    
    let result = await moviesfileDal.saveMovies(newArr);
    
    return result;

   
};
const updateUser = async (userId,transactions) =>
{
    let usersArr ={"users":[]};
    let fileUsers = await usersFileDal.getUsers();
    let usersData = fileUsers.users;
   let userIndex = usersData.findIndex (x=> x.id == userId);
   let user = usersData.find(x=>x.id == userId);
   user.transactions = transactions;
   usersData[userIndex] = user;
   usersArr.users=usersData;
   let result = await usersFileDal.saveUsers(usersArr);
    return result;
}
const getLanguages = async()=>{
    let languages=[];
    let wsData = await moviesWsDal.getMovies();
    let moviesFromWs = wsData.data;
    moviesFromWs.forEach(x=>{
        if(!languages.includes(x.language)){languages.push(x.language);}
    })
    let fileData = await moviesfileDal.getMovies();
    let moviesFromFile = fileData.movies;
    moviesFromFile.forEach(x=>{
        if(!languages.includes(x.language)){languages.push(x.language);}
    })
    return languages;

}
const getFilterdMovies = async(query)=>{

    // GET ALL MOVIES
    let wsData = await moviesWsDal.getMovies();
    let moviesFromWs = wsData.data;
    let movies = moviesFromWs.map(x=>{
       return {id:x.id,name:x.name,language:x.language,genres:x.genres}
    });
    let fileData = await moviesfileDal.getMovies();
    let moviesFromFile = fileData.movies;
    moviesFromFile.forEach(x=>{
        movies.push(x);
    })

    // FILTER MOVIES
    let filteredMovies = movies;
    if(query.name){  
        if(query.language){
            if(query.genre){
                filteredMovies =  movies.filter(x=> x.name.toLowerCase().includes(query.name.toLowerCase()) || x.language.includes(query.language) || x.genres.includes(x.genre))
            }else{
                filteredMovies =  movies.filter(x=> x.name.toLowerCase().includes(query.name.toLowerCase()) || x.language.includes(query.language))
            }
        }else if(query.genre){
            filteredMovies =  movies.filter(x=> x.name.toLowerCase().includes(query.name.toLowerCase()) || x.genres.includes(x.genre))
        }else{
            filteredMovies =  movies.filter(x=> x.name.toLowerCase().includes(query.name.toLowerCase()) )
        }
    }else if(query.language){
        if(query.genre){
            filteredMovies =  movies.filter(x=> x.language.includes(query.language) || x.genres.includes(x.genre))
        }else{
            filteredMovies =  movies.filter(x=>  x.language.includes(query.language))
        }
    }else if(query.genre){
        filteredMovies =  movies.filter(x=> x.genres.includes(query.genre))
    }

    //ADD 10 FIRST RECOMMENDED MOVIES TO MOVIES ARRAY (RECOMMENDED = WITH THE SAME GENER AS THE FIRST GENER OF THE MOVIE)
    let finalMoviesArr = filteredMovies.map(x=>{
        let firstGenre = x.genres[0];
        let recommended = movies.filter(y=>y.genres.includes(firstGenre) && x.id != y.id).slice(0, 10);
        let recommendedFilterd = recommended.map(z=>{
            return {id:z.id,name:z.name}
        })
        return {id:x.id,name:x.name,recommended:recommendedFilterd}
    })
  

    return finalMoviesArr;
}
const getMovieById = async(movieId)=>{
    let wsData = await moviesWsDal.getMovies();
    let moviesFromWs = wsData.data;
    let movieWs = moviesFromWs.find(x=>x.id == movieId);
    if(movieWs){
        return movieWs;
    }else{
        let fileData = await moviesfileDal.getMovies();
        let moviesFromFile = fileData.movies;
        let movieFile = moviesFromFile.find(x=>x.id == movieId);
        if(movieFile){
            return movieFile;
        }else{
            return false;
        }
    }
    
    

}

module.exports = {saveMovie,getGenres,updateUser,getLanguages,getFilterdMovies,getMovieById}
