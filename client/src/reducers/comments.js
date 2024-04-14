import {FETCH_COMMENT_POST, CREATE, UPDATE, DELETE} from "../constants/actionTypes";

const commentReducer = (state = {isLoading: true, comments: []}, action) => {
    switch(action.type){
        case 'START_LOADING':
            return {
                ...state, isLoading: true
            };
        case 'END_LOADING':
            return {
                ...state, isLoading: false
            };
        case FETCH_COMMENT_POST:
            return {
                ...state,
                comments: action.payload.data
            };
        case CREATE:
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.payload
                ]
            };
        case UPDATE:
            return {
                ...state,
                comments: state.comments.map((comment) => (comment.id === action.payload.id ? action.payload : comment))
            };
        case DELETE:
            return {
                ...state,
                comments: state.comments.filter((comment) => comment.id !== action.payload)
            };
        default:
            return state;
    }
}
export default commentReducer;