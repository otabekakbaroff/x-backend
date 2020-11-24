require('dotenv').config();
const server = require('./server.js')
const http = require('http')
const port = process.env.PORT;
const app = http.createServer(server);
const io = require('socket.io')(app)

const crypto = require('crypto');




let activeConnections = new Set()

let user_socketId = {}


io.on("connection", function(socket){
    console.log(`connected id: ${socket.id}`)
    //Login
    socket.on('user-info', function(data){
        let hash = crypto.createHash('md5').update(data).digest("hex")
        io.to(socket.id).emit('confirm', hash)
        activeConnections.add(socket.id)
        user_socketId = {...user_socketId, [hash]:socket.id}
    })
    // Reconnection
    socket.on('reconnection',function(data){
        console.log(`reconnection user: ${data}`)
        console.log(socket.id)
        user_socketId = {...user_socketId, [data]:socket.id}
        console.log(user_socketId)
    })
    if(!activeConnections.has(socket.id)){
        io.to(socket.id).emit('reconnect','please reconnect...')
    }
    //disconnect
    socket.on('disconnect', () => {
        console.log(`disconnected id: ${socket.id}`)
        activeConnections.delete(socket.id)
    });
    //send message
    socket.on('private', function(data){
        console.log(user_socketId[crypto.createHash('md5').update(data.username).digest("hex")])
        io.to(user_socketId[crypto.createHash('md5').update(data.username).digest("hex")]).emit('private', {username:data.username, message:data.message})
    })
})


app.listen(port, () => console.log(`Server running on port ${port}`))





