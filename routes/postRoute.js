const express = require("express");
const postRouter = express.Router();
const { auth } = require("../middleware/auth.middleware");
const { PostModel } = require("../model/post.model");

postRouter.use(auth);
postRouter.post("/create", async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.json({ post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

postRouter.get("/", async (req, res) => {
  const { device } = req.query;
  const { userID } = req.body;
  try {
    const posts = await PostModel.find({ userID, device });
    res.json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

postRouter.get("/top", async (req, res) => {
  const { device } = req.query;
  const { userID } = req.body;
  try {
    const posts = await PostModel.find({ userID, device })
      .sort({ no_of_comments: -1 })
      .limit(3);
    res.json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body, device } = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(id, {
      title,
      body,
      device,
    });
    res.json({ post: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await PostModel.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = { postRouter };
