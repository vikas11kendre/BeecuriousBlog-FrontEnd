import {
  FETCH_ALL,
  COMMENT,
  FETCH_BY_CREATOR,
  AUTH,
  START_LOADING,
  END_LOADING,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  TOGGLE,
  SETID,
  LOGOUT,
  FETCH_POST,
  TRENDING,
  FETCH_BY_CATAGEORY,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(`known error ${error.message}`);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
  } catch (error) {
    console.log(`known error ${error.message}`);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(`known error ${error.message}`);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
    navigate("/");
  } catch (error) {
    console.log(`known error ${error.message}`);
  }
};

export const toggleForm = (state) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE, payload: !state });
  } catch (error) {
    console.log(`known error ${error.message}`);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(`known error ${error.message}`);
  }
};
export const setId = (currentid) => async (dispatch) => {
  try {
    dispatch({ type: SETID, payload: currentid });
  } catch (error) {
    console.log(`known error ${error.message}`);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const setAuthData =
  ({ result, token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: AUTH, data: { result, token } });
    } catch (error) {
      console.log(error);
    }
  };

export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getTrendingPosts();

    dispatch({ type: TRENDING, payload: data });
  } catch (error) {
    console.log(`known error ${error.message}`);
  }
};

export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchPostsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByCatageory = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsByCatageory(name);

    dispatch({ type: FETCH_BY_CATAGEORY, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
