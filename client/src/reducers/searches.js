import { CREATE, UPDATE, DELETE, FETCH_ALL_SEARCH, FETCH_SEARCH_USER } from "../constants/actionTypes";

const searchReducer = (state = {isLoading: true, searches: []}, action) => {
    switch(action.type){
        case 'START_LOADING':
            return {
                ...state, isLoading: true
            };
        case 'END_LOADING':
            return {
                ...state, isLoading: false
            };
        case FETCH_ALL_SEARCH:
            return {
                ...state,
                searches: action.payload.data
            };
        case FETCH_SEARCH_USER:
            return {
                ...state,
                searchUser: action.payload.searchUser
            }
        case CREATE:
            return {
                ...state,
                searches: [
                    ...state.searches,
                    action.payload
                ]
            };
        case UPDATE:
            return {
                ...state,
                searches: state.searches.map((search) => (search.id === action.payload.id ? action.payload : search))
            };
        case DELETE:
            return {
                ...state,
                searches: state.searches.filter((search) => search.id !== action.payload)
            };
        default:
            return state;
    }
}
export default searchReducer;