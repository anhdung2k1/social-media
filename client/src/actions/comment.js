import { START_LOADING, END_LOADING,FETCH_COMMENT_POST,CREATE, UPDATE, DELETE } from "../constants/actionTypes";
import * as api from '../api/index.js';

export const getCommentByPostId = (postId) => async(dispatch) => {
    try{
      dispatch({type: START_LOADING});
  
      const { data } = await api.fetchCommentByPostId(postId);
  
      dispatch({ type: FETCH_COMMENT_POST, payload: { data}});
      dispatch({type: END_LOADING});
  
    }catch(e){
      console.log(e);
    }
}
export const createCommentByUserId = (userId,postId,newComment) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING });
    const { data } = await api.createCommentByUserId(userId,postId,newComment);

    dispatch({ type: CREATE, payload: data });
  }catch(e){
    console.log(e);
  }
}
export const updateComment = (id,updatedComment) => async(dispatch) => {
  try{
    const {data} = await api.updateComment(id,updatedComment);
    
    dispatch({type: UPDATE, payload: data});
  }catch(error){
    console.log(error);
  }
}
export const deleteComment = (id) => async (dispatch) => {
  try {
    await api.deleteComment(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};