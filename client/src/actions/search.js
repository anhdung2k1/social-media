import { START_LOADING, END_LOADING,CREATE, UPDATE, DELETE, FETCH_ALL_SEARCH, FETCH_SEARCH_USER } from "../constants/actionTypes";
import * as api from '../api/index.js';

export const getSearchRecents = () => async(dispatch) => {
    try{
      dispatch({type: START_LOADING});
  
      const { data } = await api.fetchSearchRecents();
  
      dispatch({ type: FETCH_ALL_SEARCH, payload: { data}});
      dispatch({type: END_LOADING});
  
    }catch(e){
      console.log(e);
    }
}
export const getSearchRecentsByUserId = (userId) => async(dispatch) => {
    try{
      dispatch({ type: START_LOADING });
      const {data} = await api.fetchSearchRecentsByUserId(userId);
  
      dispatch({ type: FETCH_SEARCH_USER, payload: {searchUser: data}});
      dispatch({ type: END_LOADING });
    }catch(e){
      console.log(e);
    }
  }
export const createSearchRecent = (userId,newSearch) => async(dispatch) => {
  try{
    dispatch({ type: START_LOADING });
    const { data } = await api.createSearchRecent(userId,newSearch);

    dispatch({ type: CREATE, payload: data });
  }catch(e){
    console.log(e);
  }
}
export const updateSearch = (id,updatedSearch) => async(dispatch) => {
  try{
    const {data} = await api.updateSearch(id,updatedSearch);
    
    dispatch({type: UPDATE, payload: data});
  }catch(error){
    console.log(error);
  }
}
export const deleteSearch = (id) => async (dispatch) => {
  try {
    await api.deleteSearch(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};