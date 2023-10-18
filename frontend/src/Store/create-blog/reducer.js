const Cookies = require("js-cookie");

const initialState = {
  fetching: false,
  data: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_BLOG":
      return { ...state, fetching: true, data: [], error: null };
    case "CREATE_BLOG_SUCCESS":
        Cookies.set("created",  true);
      return { ...state, fetching: false, data: action.payload, error: null };
    case "CREATE_BLOG_FAILURE":
      return { ...state, fetching: false, data: [], error: action.error };
    default:
      return state;
  }
};
export default reducer;
