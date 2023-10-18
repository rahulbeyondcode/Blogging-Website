import React from "react";
import renderHTML from "react-render-html";

const Blog = props => {
  const blog = props.blog[0];
  return (
    <div className="blog">
      <h2 className="blog-title">{blog.blogTitle}</h2>
      <p className="blog-description">{renderHTML(blog.blogText)}</p>
    </div>
  );
};

export default Blog;
