const db = require('../db/dbconfig')


module.exports = {
	findUser,
  addUser,
  searchUser
}

function findUser(filter){
	return  db('users').where(filter);
}
function searchUser(filter){
	return  db('users').where('users.username',"like", `${filter}%`);
}
function addUser(user) {
    return db('users')
      .insert(user)
      .then(id =>{
         return {username:user.username}
      });
}