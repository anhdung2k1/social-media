import {
  START_LOADING,
  END_LOADING,
  CREATE,
  DELETE,
  FETCH_ROOM,
  FETCH_ALL,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getAllRoom = (sendUserId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.getAllRoom(sendUserId);

    console.log("data all rooms: ", data);

    dispatch({ type: FETCH_ALL, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (e) {
    console.log(e);
  }
};

export const getRoom = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.getRoom(roomId);

    console.log(data);

    dispatch({ type: FETCH_ROOM, payload: { room: data } });
    dispatch({ type: END_LOADING });
  } catch (e) {
    console.log(e);
  }
};
export const createRoom = (userId, roomId, newRoom) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createRoom(userId, roomId, newRoom);

    dispatch({ type: CREATE, payload: data });
  } catch (e) {
    console.log(e);
  }
};
export const deleteRoom = (roomId) => async (dispatch) => {
  try {
    await api.deleteRoom(roomId);

    dispatch({ type: DELETE, payload: roomId });
  } catch (error) {
    console.log(error);
  }
};
