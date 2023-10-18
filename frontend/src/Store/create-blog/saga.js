import { call, put } from "redux-saga/effects";
import API from "../../Config";

const fetch = payload => {
  return API.post(`/blog`, payload)
};

function* worker({ payload }) {
  try {
    const response = yield call(fetch, payload);
    if(response.data.success) {
      window.location.href = `/${window.location.pathname.split('/')[1]}`;
    }
    yield put({ type: "CREATE_BLOG_SUCCESS", payload: response });
  } catch (error) {
    yield put({ type: "CREATE_BLOG_FAILURE", error: error.response.data.err });
  }
}
export default worker;
