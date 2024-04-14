import {FETCH_POST_LIKE, FETCH_ALL_LIKE,CREATE_LIKE, UPDATE_LIKE, DELETE_LIKE,FETCH_COMMENT_LIKE} from "../constants/actionTypes";
const reactionReducer = (state = {isLoading: true, reactions: []}, action)=>{
    switch (action.type) {
        case 'START_LOADING' :
            return {
                ...state,isLoading: true
            };
        case 'END_LOADING':
            return {
                ...state,
                isLoading: false
            };
        case FETCH_ALL_LIKE:
            return {
                ...state,
                reactions: action.payload.data,
            };
        case FETCH_POST_LIKE:
            return {
                ...state,
                reactionPost: action.payload.reactionPost
            };
        case FETCH_COMMENT_LIKE:
            return {
                ...state,
                reactionComment: action.payload.reactionComment
            };
        case CREATE_LIKE:
            return {
                ...state,
                reactions: [
                    ...state.reactions,
                    action.payload
                ]
            };
        case UPDATE_LIKE:
            return {
                ...state,
                reactions: state.reactions.map((reaction) => (reaction.id === action.payload.id ? action.payload : reaction ))
            };
        case DELETE_LIKE:
            return {
                ...state,
                reactions: state.reactions.filter((reaction) => (reaction.userId !== action.payload.userId && reaction.postId !== action.payload.postId ))
            };
        default:
            return state;
    }
}

export default reactionReducer;