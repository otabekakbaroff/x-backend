const db = require('../db/dbconfig')


module.exports = {
  getAllUsers,
	findUser,
	addUser
}
function getAllUsers(){
	return  db('users');
}

function findUser(filter){
	return  db('users').where(filter);
}

function addUser(user) {
    return db('users')
      .insert(user)
      .then(id => id);
}