const express = require("express");
const router = express.Router();
const { cloudinary } = require("../cloudinary");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User register successfully");
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      res.send(user);
    } else {
      res.send("Invalid credentials");
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.post("/followuser", async (req, res) => {
  try {
    // get current user and receiver user from body
    const { currentuserid, receiveruserid } = req.body;
    // update current user following data with followed user id (receiveruserid)
    const currentuser = await User.findOne({ _id: currentuserid });
    const currentUserFollowing = currentuser.following;
    currentUserFollowing.push(receiveruserid);
    currentuser.following = currentUserFollowing;

    await User.updateOne({ _id: currentuserid }, currentuser);

    // update followed user id followers with current user (currentuserid)
    const receiveruser = await User.findOne({ _id: receiveruserid });
    var receiverUserFollower = receiveruser.followers;
    receiverUserFollower.push(currentuserid);

    receiveruser.followers = receiverUserFollower;

    await User.updateOne({ _id: receiveruserid }, receiveruser);

    res.send("Followed Successfully");
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.post("/unfollowuser", async (req, res) => {
  try {
    // get current user and receiver user from body
    const { currentuserid, receiveruserid } = req.body;
    // update current user following data with followed user id (receiveruserid)
    const currentuser = await User.findOne({ _id: currentuserid });
    const currentUserFollowing = currentuser.following;

    const temp1 = currentUserFollowing.filter((obj) =>
      obj ? obj.toString() !== receiveruserid : false
    );

    currentuser.following = temp1;

    await User.updateOne({ _id: currentuserid }, currentuser);

    // update followed user id followers with current user (currentuserid)
    const receiveruser = await User.findOne({ _id: receiveruserid });
    var receiverUserFollower = receiveruser.followers;

    const temp2 = receiverUserFollower.filter(
      (obj) => obj.toString() !== currentuserid
    );

    receiveruser.followers = temp2;

    await User.updateOne({ _id: receiveruserid }, receiveruser);

    res.send("Un Followed Successfully");
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.post("/edit", async (req, res) => {
  try {
    var prevUser = await User.findOne({ _id: req.body._id });

    if (prevUser.profilePicture == req.body.profilePicture) {
      await User.updateOne({ _id: req.body._id }, req.body);
      const user = await User.findOne({_id: req.body._id})
      res.send(user);
    } else {
      const uploadRes = await cloudinary.v2.uploader.upload(req.body.profilePicture, {
        folder: "social_app",
        use_filename: true,
      });
      req.body.profilePicture = uploadRes.url;
      await User.updateOne({ _id: req.body._id }, req.body);
      const user = await User.findOne({_id: req.body._id})
      res.send(user);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

module.exports = router;
