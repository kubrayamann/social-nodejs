const router = require('express').Router();
const Post = require("../models/Post");
const User = require("../models/User");


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

router.delete("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne({
                $set : req.body
            });
            return res.status(200).json("The post has been deleted successfully");
        }else{
            return res.status(403).json("You can delete only your posts");
        }
    }catch(err){
        return res.status(500).json(err);
    }
});
//LIKE / DISLIKE A POST

router.put("/:id/like", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({
                $push: {
                    likes : req.body.userId
                }
            });
            return res.status(200).json("The post has been liked successfully");
        }else{
            await post.updateOne({
                $pull : {
                    likes : req.body.userId
                }
            });
            return res.status(200).json("The post has been disliked successfully");
        }
    }catch(err){
        return res.status(500).json(err);
    }
});
//GET A POST

router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET A TIME LINE OF POSTS

router.get("/timeline/all", async (req, res) => { 
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId:currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({userId : friendId});
            })
        );
        res.json(userPosts.concat(...friendPosts));
    }catch(err){
        return res.status(500).json(err);
    }
});

module.exports = router;