const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register",async (req, res) => {
   try {
       //generate new password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password, salt);
       //create new user
       const newUSer = new User({
            username: req.body.username, 
            email: req.body.email,
            password: hashedPassword, 
        }); 
        //user controller
        const emailCheck = await User.findOne({email: req.body.email});
        if(emailCheck){
            return res.status(500).json("user registered");
        }else{
            //save user and return response
            const user = await newUSer.save();
            res.status(200).json(user);
        }
        //const user = await newUSer.save();
        //res.status(200).json(user);
    } catch (err) {
        //console.error(err.message);
        res.status(500).json(err);
    }
});


//LOGIN

router.post("/login", async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({error: "user not found"});
        }
        //!user && res.status(404).json("user not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
            return res.status(400).json("Wrong password");
        }
        //!validPassword && res.status(400).json("Wrong Password");
        res.status(200).json(user);
    }catch(err){
        //console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
 