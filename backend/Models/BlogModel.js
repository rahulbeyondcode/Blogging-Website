const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      lowercase: true
    },
    blogText: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    cardDescription: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
