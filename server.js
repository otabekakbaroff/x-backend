const cors=require('cors');

const helmet=require('helmet');

const express = require('express');

const server = express();

const users=require('./users/users_router');

server.use(express.json());

server.use(cors());

server.use(helmet());

server.use('/api/users', users);

server.use(express.static("public"));


server.get('/', (req,res)=>{
    res.json({ Message:`*** SERVER IS UP AND RUNNING ***` })
})


module.exports = server;
