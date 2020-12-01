const db = require('../db/dbconfig')


module.exports = {
    myConnections,
    sendMessage,
    myMessages
}
//privateMessage
function myMessages(sender,receiver){
  return  db('messages')
    .where("messages.from", sender)
    .andWhere("messages.to", receiver)
    .orWhere("messages.from",receiver)
    .andWhere("messages.to", sender)
    .orderBy("messages.date")
}

// Get all connections (users)
function myConnections(sender){
  return db('messages')
  .select("messages.from","messages.to")
  .where("messages.from", sender)
  .orWhere("messages.to", sender)
  .distinct()
}

function sendMessage(message) {
    return db('messages')
      .insert(message)
      .then(id => id);
}
