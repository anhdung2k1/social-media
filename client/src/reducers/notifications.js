import {FETCH_NOTIFICATION_USER, FETCH_ALL, FETCH_NOTIFICATION, CREATE, DELETE } from '../constants/actionTypes';

const commentReducer = (state = {isLoading: true, notifications: []}, action) => {
    switch(action.type){
        case 'START_LOADING':
            return {
                ...state, isLoading: true
            };
        case 'END_LOADING':
            return {
                ...state, isLoading: false
            };
        case FETCH_ALL:
            return {
                ...state,
                notifications: action.payload.data
            };
        case FETCH_NOTIFICATION_USER:
            return {
                ...state,
                notificationUser: action.payload.notificationUser
            }
        case FETCH_NOTIFICATION:
            return {
                ...state,
                notification: action.payload.notification
            }
        case CREATE:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    action.payload
                ]
            };
        case DELETE:
            return {
                ...state,
                notifications: state.notifications.filter((notification) => notification.id !== action.payload)
            };
        default:
            return state;
    }
}
export default commentReducer;