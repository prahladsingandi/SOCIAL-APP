const express = require("express");
const router = express.Router();
const { cloudinary } = require("../cloudinary");
const moment = require("moment");
const Post = require("../models/postModel");

router.post("/addpost", async (req, res) => {
  try {
    const uploadRes = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "social_app",
      use_filename: true,
    });

    req.body.image = uploadRes.url;
    const newPost = new Post(req.body);
    await newPost.save();
    res.send("Post added successfully");
  } catch (e) {
    console.log(e);
    res.error.status(400).json(e);
  }
});

router.get("/getallposts", async (req, res) => {
  try {
    const posts = await Post.find().populate("user").sort({createdAt : -1}).exec();
    res.send(posts);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.post("/likeorunlikepost", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.postid });
    var likes = post.likes;

    if (likes.find((obj) => obj.user == req.body.userid)) {
      const temp = likes.filter(
        (obj) => obj.user.toString() !== req.body.userid
      );
      post.likes = temp;
      await Post.updateOne({ _id: req.body.postid }, post);
      res.send("Post unliked successfully");
    } else {
      likes.push({
        user: req.body.userid,
        date: moment().format("MMM DD yyyy"),
      });

      post.likes = likes;
      await Post.updateOne({ _id: req.body.postid }, post);
      res.send("Post liked successfully");
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

router.post("/addcomment", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.postid });
    var comments = post.comments;

    comments.push({
      user: req.body.userid,
      date: moment().format("MMM DD yyyy"),
      comment: req.body.comment,
    });
    post.comments = comments;
    await Post.updateOne({ _id: req.body.postid }, post);
    res.send("Comment added successfully");
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

router.post("/editpost", async (req, res) => {
  try {
    await Post.updateOne({ _id: req.body._id }, req.body);
    res.send("Post updated successfully");
  } catch (e) {
    console.log(e);
    res.error.status(400).json(e);
  }
});

router.post("/deletepost", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.body._id });
    res.send("Post deleted successfully");
  } catch (e) {
    console.log(e);
    res.error.status(400).json(e);
  }
});

module.exports = router;
