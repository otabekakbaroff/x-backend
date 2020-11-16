require('dotenv').config();
const server = require('./server.js')
const http = require('http')
const port = process.env.PORT;
const app = http.createServer(server);
const io = require('socket.io')(app)

let socketIds = {}


io.on("connection", function(socket){
    io.to(socket.id).emit('confirm',`success`)
    socket.on('user-info', function(data){
        console.log('user-info')
        socketIds = {...socketIds, [data]:socket.id}
        console.log(socketIds)
    })
    socket.on('private', function(data){
        io.to(socketIds[data.username]).emit('private', {username:data.username, message:data.message})
    })
})

app.listen(port, () => console.log(`Server running on port ${port}`))





