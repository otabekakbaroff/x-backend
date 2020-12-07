require('dotenv').config();
const server = require('./server.js')
const http = require('http');
const port = process.env.PORT;
const app = http.createServer(server);
const io = require('socket.io')(app)
const Messages = require('./messages/message_model')
const Users = require('./users/users_model')
// const crypto = require('crypto');




let activeConnections = new Set()

let userHash_socketId = {}


io.on("connection", function(socket){
    console.log(`connected id: ${socket.id}`)
    //Login
    socket.on('user-info', function(data){
        console.log(data)
        // let hash = crypto.createHash('md5').update(data).digest("hex")
        io.to(socket.id).emit('confirm', data)
        activeConnections.add(socket.id)
        userHash_socketId = {...userHash_socketId, [data]:socket.id}
    })



    // Reconnection
    socket.on('reconnection',function(data){
        console.log(`reconnecting user: ${data}`)
        userHash_socketId = {...userHash_socketId, [data]:socket.id}
    })
    if(!activeConnections.has(socket.id)){
        io.to(socket.id).emit('reconnect','reconnection confirmation...')
    }



    //Disconnect
    socket.on('disconnect', () => {
        console.log(`disconnected id: ${socket.id}`)
        activeConnections.delete(socket.id)
    });

    socket.on('user-search',(data) =>{
            Users.searchUser(data).then(users =>{
                io.to(socket.id).emit('user-search',users)
            })
            .catch(error=>{
                console.log(error)
                io.to(socket.id).emit('user-search','error')
            })
    })

    //Send message
    socket.on('private', function(data){
        Messages.sendMessage({from:data.from,to:data.to,message:data.message, date:data.date}).then(messages=>{
            console.log(messages)
        })
        .catch(error=>{
                console.log(error)
        })
        io.to(userHash_socketId[data.to]).emit('private', {username:data.from, message:data.message})
    })
})


app.listen(port, () => console.log(`Server running on port ${port}`))





