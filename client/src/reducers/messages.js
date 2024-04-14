import {FETCH_MESSAGE_ROOM, CREATE, UPDATE, DELETE} from "../constants/actionTypes";

const messageReducer = (state = {isLoading: true, messages: []}, action) => {
    switch(action.type){
        case 'START_LOADING':
            return {
                ...state, isLoading: true
            };
        case 'END_LOADING':
            return {
                ...state, isLoading: false
            };
        case FETCH_MESSAGE_ROOM:
            return {
                ...state,
                messages: action.payload.data
            };
        case CREATE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.payload
                ]
            };
        case UPDATE:
            return {
                ...state,
                messages: state.messages.map((message) => (message.messId === action.payload.messId ? action.payload : message))
            };
        case DELETE:
            return {
                ...state,
                messages: state.messages.filter((message) => message.messId !== action.payload)
            };
        default:
            return state;
    }
}
export default messageReducer;