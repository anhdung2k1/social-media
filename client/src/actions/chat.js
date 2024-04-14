import { START_LOADING, END_LOADING,CREATE, UPDATE, DELETE, FETCH_MESSAGE_ROOM } from "../constants/actionTypes";
import * as api from '../api/index.js';

export const getMessageRoom = (roomId) => async(dispatch) => {
    try{
      dispatch({type: START_LOADING});
  
      const { data } = await api.fetchMessageRoom(roomId);
  
      dispatch({ type: FETCH_MESSAGE_ROOM, payload: { data}});
      dispatch({type: END_LOADING});
  
    }catch(e){
      console.log(e);
    }
}
export const createMessage = (userId,roomId,newMessage) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING });
    const { data } = await api.createMessage(userId,roomId,newMessage);

    dispatch({ type: CREATE, payload: data });
  }catch(e){
    console.log(e);
  }
}
export const updateMessage = (messId,updatedMessage) => async(dispatch) => {
  try{
    const {data} = await api.updateMessage(messId, updatedMessage);
    
    dispatch({type: UPDATE, payload: data});
  }catch(error){
    console.log(error);
  }
}
export const deleteMessage = (messId) => async (dispatch) => {
  try {
    await api.deleteMessage(messId);

    dispatch({ type: DELETE, payload: messId });
  } catch (error) {
    console.log(error);
  }
};