import {
  FETCH_ALL,
  END_LOADING,
  FETCH_BY_CREATOR,
  COMMENT,
  START_LOADING,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_POST,
  TRENDING,
  FETCH_BY_CATAGEORY,
} from "../constants/actionTypes";

const posts = (
  state = { isLoading: true, posts: [], trendingPosts: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
    case FETCH_BY_CATAGEORY:
      return { ...state, posts: action.payload };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case TRENDING:
      return { ...state, trendingPosts: action.payload };

    default:
      return state;
  }
};

export default posts;
