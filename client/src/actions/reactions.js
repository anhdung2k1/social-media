import {FETCH_COMMENT_LIKE,FETCH_POST_LIKE,START_LOADING, END_LOADING, FETCH_ALL_LIKE, CREATE_LIKE, UPDATE_LIKE, DELETE_LIKE } from '../constants/actionTypes';
import * as api from '../api/index.js';
//To-do
export const createLike = (userId,newLike) => async (dispatch) => {

    try {
      const { data } = await api.createLike(userId,newLike);
  
      dispatch({ type: CREATE_LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
};
export const getLikes = () => async(dispatch) => {
    try{
        dispatch({ type: START_LOADING });
        const { data} = await api.fetchAllLike();
    
        dispatch({ type: FETCH_ALL_LIKE, payload: {data}});
        dispatch({ type: END_LOADING }); 
    }
    catch(error) {
        console.log(error);
    }
}
export const getLikesPost = (postId) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchAllLikePost(postId);
    
        dispatch({ type: FETCH_POST_LIKE, payload: { data } });
        dispatch({ type: END_LOADING });
      } catch (error) {
        console.log(error);
      }
}
export const getLikesComment = (commentId) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchAllLikeComment(commentId);
    
        dispatch({ type: FETCH_COMMENT_LIKE, payload: { data } });
        dispatch({ type: END_LOADING });
      } catch (error) {
        console.log(error);
      }
}
export const updateLike = (id, updatedLike) => async (dispatch) => {
    try {
      const { data } = await api.updateLike(id, updatedLike);
  
      dispatch({ type: UPDATE_LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
};
export const deleteLike = (postId, userId) => async (dispatch) => {
    try {
      await api.deleteLike(postId, userId);
  
      dispatch({ type: DELETE_LIKE, payload: {postId,userId} });
    } catch (error) {
      console.log(error);
    }
  };
  