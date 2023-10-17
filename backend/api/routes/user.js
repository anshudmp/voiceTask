const express = require('express');
const router = express.Router();
const User = require('../../models/user');

//route POST api/users
//desc Register a User 
//access Public



router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET user requests to /users "
    })
})

router.post('/',
 async (req,res) => {
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    await user.save();
    res.status(200).send(user)
    
});

module.exports = router; 