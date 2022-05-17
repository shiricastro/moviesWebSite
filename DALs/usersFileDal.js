const jFile = require('jsonfile');


const getUsers = () =>
{
    return new Promise((resolve, reject) =>
    {
        jFile.readFile(__dirname + "/../Data/users.json", function(err,data)
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

const saveUsers = (obj) =>
{
    return new Promise((resolve, reject) =>
    {
        jFile.writeFile(__dirname + "/../Data/users.json", obj, function(err)
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


module.exports = {getUsers,saveUsers}