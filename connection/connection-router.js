const router = require('express').Router();
const Connections = require('./connections-model');

router.get('/:username/friends-list', (req,res)=>{
    const {username} = req.params
    Connections.friendsList(username).then(friends=>{
        res.json(friends)
    })
    .catch(error=>{
        console.log(error)
    })
})
router.post('/send-friend-request', (req,res)=>{
    const body = req.body
    Connections.send_friendRequest(body).then(user=>{
        res.json(user)
    })
    .catch(error=>{
        console.log(error)
    })
})
router.post('/friend-requests', (req,res)=>{
    const {username} = req.body
    Connections.friendRequests(username).then(user=>{
        res.json(user)
    })
    .catch(error=>{
        console.log(error)
    })
})


module.exports = router