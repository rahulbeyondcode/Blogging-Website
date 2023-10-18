import { combineReducers } from "redux";

import createBlog from "./create-blog";
import deleteBlog from "./delete-blog";
import editBlog from "./edit-blog";
import getAllBlogs from "./get-all-blogs";

export default combineReducers({
  createBlog: createBlog.reducer,
  deleteBlog: deleteBlog.reducer,
  editBlog: editBlog.reducer,
  getAllBlogs: getAllBlogs.reducer,
});
