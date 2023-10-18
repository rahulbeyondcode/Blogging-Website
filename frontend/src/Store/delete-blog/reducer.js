const Cookies = require("js-cookie");

const initialState = {
  fetching: false,
  data: {},
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_BLOG":
      return { ...state, fetching: true, data: {}, error: null };
    case "DELETE_BLOG_SUCCESS":
        Cookies.set("deleted",  true)
      return { ...state, fetching: false, data: action.payload, error: null };
    case "DELETE_BLOG_FAILURE":
      return { ...state, fetching: false, data: {}, error: action.error };
    default:
      return state;
  }
};
export default reducer;
