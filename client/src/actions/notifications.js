import {START_LOADING,FETCH_NOTIFICATION_USER, END_LOADING, FETCH_ALL, FETCH_NOTIFICATION, CREATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';



export const getNotification = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchNotificationById(id);
  
      dispatch({ type: FETCH_NOTIFICATION, payload: { notification: data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
};

export const getNotificationsByUserId = (userId) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING });
    const {data} = await api.fetchNotificationsByUserId(userId);

    dispatch({ type: FETCH_NOTIFICATION_USER, payload: {notificationUser: data}});
    dispatch({ type: END_LOADING });
  }catch(e){
    console.log(e);
  }
}

export const getNotifications = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchNotifications();
  
      dispatch({ type: FETCH_ALL, payload: {data}});
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
};


//OK
export const createNotification = (userId, newNotification) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createNotification(userId,newNotification);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
//OK
export const deleteNotification = (id) => async (dispatch) => {
  try {
    await api.deleteNotification(id);

    dispatch({ type: DELETE, payload: id});
  } catch (error) {
    console.log(error);
  }
};