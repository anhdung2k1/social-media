import {FETCH_BY_SEARCH,FETCH_POST_USER, FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE} from "../constants/actionTypes";
const postReducer = (state = {isLoading: true, posts: []}, action)=>{
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
        case FETCH_BY_SEARCH:
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
            };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload.post
            };
   
        case FETCH_POST_USER:
            return {
                ...state,
                postUser: action.payload.postUser
            };
        case CREATE:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    action.payload
                ]
            };
        case UPDATE:
            return {
                ...state,
                posts: state.posts.map((post) => (post.id === action.payload.id ? action.payload : post ))
            };
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload)
            };
        default:
            return state;
    }
}

export default postReducer;