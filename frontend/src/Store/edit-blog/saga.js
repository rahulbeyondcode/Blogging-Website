import { call, put } from "redux-saga/effects";
import API from "../../Config";

const fetch = (payload, id) => {
  return API.patch(`/blog?id=${id}`, payload)
};

function* worker({ payload, id }) {
  try {
    const response = yield call(fetch, payload, id);
    if(response.data.success) {
      window.location.href = `/${window.location.pathname.split('/')[1]}`;
    }
  
    yield put({ type: "EDIT_BLOG_SUCCESS", payload: response });
  } catch (error) {
    yield put({ type: "EDIT_BLOG_FAILURE", error: error.response.data.err });
  }
}
export default worker;
