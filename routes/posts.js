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

router.put("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({
                $set : req.body
            });
            return res.status(200).json("The post has been updated successfully");
        }else{
            return res.status(403).json("You can updated only your posts");
        }
    }catch(err){
        return res.status(500).json(err);
    }
});

//DELETE A POST
//LIKE A POST
//GET A POST
//GET A TIME LINE OF POSTS

module.exports = router;