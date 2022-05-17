
const usersFileDal = require('../DALs/usersFileDal');


const getUsers = async()=>{
    let usersData = await usersFileDal.getUsers();
    let users = usersData.users;
    let usersArr = users.filter(x=>x.username != "admin");
    return usersArr;
}
const getUserById = async(userId)=>{
    let usersData = await usersFileDal.getUsers();
    let users = usersData.users;
    let user = users.find(x=>x.id == userId);
    
    return user;
}
const deleteUser = async(userId)=>{
    let userArr = {'users':[]};
    let usersData = await usersFileDal.getUsers();
    let users = usersData.users;
    userArr.users = users.filter(x=>x.id != userId);
    
    let result = await usersFileDal.saveUsers(userArr);
    return result;

}
const updateUser = async(obj,id)=>{
    let userArr = {'users':[]};
    let usersData = await usersFileDal.getUsers();
    let users = usersData.users;
    let userIndex = users.findIndex(x=>x.id == id);
    let userCreatedData = users.find(x=>x.id == id).createdData;
    obj.createdData = userCreatedData;
    users[userIndex] = obj;
    userArr.users = users;
    let result = await usersFileDal.saveUsers(userArr);
    return result;
}
const saveUser = async(obj)=>{
    
    let userArr = {'users':[]};
    let usersFromFile = await usersFileDal.getUsers();
    let usersData = usersFromFile.users;
    let users = usersData.sort(function(a,b){return a.id - b.id});

    let lastId = users[users.length-1].id;
    obj.id = lastId + 1;

    users.push(obj);
    userArr.users = users;
    let result = await usersFileDal.saveUsers(userArr);
    return result;

}



module.exports = {getUsers,getUserById,deleteUser,updateUser,saveUser}
