const initialState = {
  fetching: false,
  data: [],
  error: null
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_BLOG":
      return { ...state, fetching: true, data: [], error: null };
    case "GET_ALL_BLOG_SUCCESS":
      return { ...state, fetching: false, data: action.payload, error: null };
    case "GET_ALL_BLOG_FAILURE":
      return { ...state, fetching: false, data: [], error: action.error };
    default:
      return state;
  }
};
export default reducer;
