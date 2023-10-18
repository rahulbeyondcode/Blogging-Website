import { call, put } from "redux-saga/effects";
import API from "../../Config";

const fetch = data => API.get(`/blogs?category=${data}`);
function* worker({ payload }) {
  try {
    const response = yield call(fetch, payload);
    const allBlogs = [...response.data];

    allBlogs.forEach((blog,index) => {
     allBlogs[index].secondID = `${blog.blogTitle.split(" ").join("-").toLowerCase()}`;
    })

    yield put({ type: "GET_ALL_BLOG_SUCCESS", payload: allBlogs });
  } catch (error) {
    yield put({ type: "GET_ALL_BLOG_FAILURE", error: error.response.data.err });
  }
}
export default worker;
