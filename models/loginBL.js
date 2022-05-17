const dal = require('../DALs/usersFileDal');

const cheackUserData = async (username,password) =>
{
    let users = await dal.getUsers();
    let userData = users.users.filter(x=>x.username == username && x.password == password);
    let answer={};
    if(userData.length > 0){
        let transactions = userData[0].transactions;
        if(transactions > 0 || username == 'admin'){
            answer.transactions = userData[0].transactions;
            answer.userId=userData[0].id;
            answer.admin=username == 'admin' ? true : false;
            answer.message="Logged in!";
        }else{
            answer.message="no transactions available for today";
        }
       
    }else{
        answer.message="invalid username or password"; 
    }
    return answer

   
};

module.exports = {cheackUserData}