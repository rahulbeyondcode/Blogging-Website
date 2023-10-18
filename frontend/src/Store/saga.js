import { takeLatest } from "redux-saga/effects";
import createBlog from "./create-blog";
import deleteBlog from "./delete-blog";
import editBlog from "./edit-blog";
import getAllBlogs from "./get-all-blogs";

export default function* watcherSaga() {
  yield takeLatest("CREATE_BLOG", createBlog.saga);
  yield takeLatest("DELETE_BLOG", deleteBlog.saga);
  yield takeLatest("EDIT_BLOG", editBlog.saga);
  yield takeLatest("GET_ALL_BLOG", getAllBlogs.saga);
}
