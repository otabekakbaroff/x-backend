const db = require('../db/dbconfig')


module.exports = {
    friendsList,
    friendRequests,
    send_friendRequest
}


function friendsList(user){
    return db('connection')
    .where('connection.to', user)
    .andWhere('connection.status', 2)
}


function send_friendRequest(request){
    return db('connection')
    .insert(request)
    .then(id=>id);
}

function friendRequests(user){
    return db('connection')
    .where('connection.to',user)
    .andWhere('connection.status', 0)
}

