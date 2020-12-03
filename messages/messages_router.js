const router = require('express').Router();
const Messages = require('./message_model')



router.post("/my-messages",(req,res)=>{
    Messages.myMessages(req.body.from,req.body.to).then(messages=>{
        res.json(messages)
    })
    .catch(error=>{
        console.log(error)
    })
})



module.exports = router;