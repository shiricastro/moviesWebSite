const jFile = require('jsonfile');


const getMovies = () =>
{
    return new Promise((resolve, reject) =>
    {
        jFile.readFile(__dirname + "/../Data/newMovies.json", function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data);
            }
        })
    })
}

const saveMovies = (obj) =>
{
    return new Promise((resolve, reject) =>
    {
        jFile.writeFile(__dirname + "/../Data/newMovies.json", obj, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Created !')
            }
        })
    })
}


module.exports = {getMovies,saveMovies}