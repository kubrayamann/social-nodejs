const router = require('express').Router();
const Post = require("../models/Post");

//CREATE A NEW POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    }catch(err){
        return res.status(500).json(err);
    }
});

//UPDATE A POST
//DELETE A POST
//LIKE A POST
//GET A POST
//GET A TIME LINE OF POSTS

module.exports = router;