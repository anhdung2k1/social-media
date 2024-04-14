import { FETCH_BY_SEARCH,START_LOADING,FETCH_POST_USER, END_LOADING, FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

//OK
export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: FETCH_POST, payload: { post: data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
};
//OK
export const getPostByUserId = (userId) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING });
    const {data} = await api.fetchPostByUserId(userId);

    dispatch({ type: FETCH_POST_USER, payload: {postUser: data}});
    dispatch({ type: END_LOADING });
  }catch(e){
    console.log(e);
  }
}
//OK
export const getPosts = (page) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data} = await api.fetchPosts(page);
  
      dispatch({ type: FETCH_ALL, payload: {data}});
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
};
//OK
export const getPostsBySearch = (keyword) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchPostsBySearch(keyword);
  
      dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
};

//OK
export const createPost = (user_id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(user_id,post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
//OK
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
//OK
export const updateAudiencePost = (id,post) => async (dispatch) => {
  try{
    const {data} = await api.updateAudiencePost(id,post);
    
    dispatch({type: UPDATE, payload: data});
  }catch(error){
    console.log(error);
  }
}

//OK
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
