const router = require('express').Router();
const Messages = require('./message_model')


router.get("/:username/connections",(req,res)=>{
    const {username} = req.params
    Messages.myConnections(username).then(messages=>{
        let newSet = []
        for(let i = 0; i < messages.length; i++){
            if(messages[i].from === username){
                newSet.push({username:messages[i].to})
            }else{
                newSet.push({username:messages[i].from})
            }
        }
        res.json(newSet)
    })
    .catch(error=>{
        console.log(error)
    })
})

router.post("/my-messages",(req,res)=>{
    Messages.myMessages(req.body.from,req.body.to).then(messages=>{
        res.json(messages)
    })
    .catch(error=>{
        console.log(error)
    })
})



module.exports = router;