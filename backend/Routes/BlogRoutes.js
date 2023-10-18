const express = require("express");
const Router = new express.Router();
const blogModel = require("../Models/BlogModel");
const ObjectId = require("mongoose").Types.ObjectId;

//Add new blog
Router.post("/blog", async (req, res) => {
  const newBlog = new blogModel(req.body);
  try {
    await newBlog.save();
    res
      .status(201)
      .send({ msg: "Your blog has been created successfully", success: true });
  } catch (err) {
    res.status(400).send({ err: "Please check your request" });
  }
});

// Get all blogs under a category
Router.get("/blogs", async (req, res) => {
  if (req.query.category) {
    try {
      const allBlogs = await blogModel.find({});
      if (!allBlogs.length) {
        return res.status(200).send([]);
      }
      const requestedBlogs = allBlogs.filter(
        blog => blog.category === req.query.category.toLowerCase()
      );
      if (!requestedBlogs.length) {
        return res.status(200).send([]);
      }
      res.status(200).send(requestedBlogs);
    } catch (err) {
      res.status(500).send({ err: "Sorry, something went wrong" });
    }
  } else {
    res.status(400).send({ err: "Please specify a category" });
  }
});

// Update a blog
Router.patch("/blog", async (req, res) => {
  const allowedUpdates = [
    "blogTitle",
    "category",
    "blogText",
    "author",
    "phoneNumber",
    "cardDescription"
  ];
  try {
    if (!Object.keys(req.body).every(item => allowedUpdates.includes(item))) {
      return res.status(400).send({ err: "Unknown fields found" });
    } else {
      if (!req.query.id) {
        return res
          .status(404)
          .send({ err: "Please specify the id of blog to edit" });
      } else if (!(await blogModel.findById(req.query.id))) {
        return res.status(404).send({ err: "Blog not found with given ID" });
      } else {
        await blogModel.findByIdAndUpdate(req.query.id, req.body);
        res
          .status(200)
          .send({ success: true, msg: "Your blog has been updated" });
      }
    }
  } catch (err) {
    res.status(404).send({ err: "Blog not found with given ID" });
  }
});

// Delete a blog
Router.delete("/blog", async (req, res) => {
  try {
    if (!req.query.id) {
      return res
        .status(404)
        .send({ err: "Please specify the id of blog to delete" });
    } else if (!(await blogModel.findById(req.query.id))) {
      return res.status(404).send({ err: "Blog not found with given ID" });
    } else {
      await blogModel.deleteOne({ _id: new ObjectId(req.query.id) });
      res.status(200).send({ success: true, msg: "Blog deleted successfully" });
    }
  } catch (err) {
    res.status(404).send({ err: "Blog not found with given ID" });
  }
});

module.exports = Router;
