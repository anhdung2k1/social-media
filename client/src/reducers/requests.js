import { FETCH_RESPONSE_USER,FETCH_REQUEST_USER, CREATE, UPDATE, DELETE, FETCH_ALL_REQUEST } from "../constants/actionTypes";

const requestReducer = (state = {isLoading: true, requests: []}, action) => {
    switch(action.type){
        case 'START_LOADING':
            return {
                ...state, isLoading: true
            };
        case 'END_LOADING':
            return {
                ...state, isLoading: false
            };
        case FETCH_ALL_REQUEST:
            return {
                ...state,
                requests: action.payload.data
            };
        case FETCH_RESPONSE_USER:
            return {
                ...state,
                response: action.payload.response
            }
        case FETCH_REQUEST_USER:
            return {
                ...state,
                request: action.payload.request
            };
        
        case CREATE:
            return {
                ...state,
                requests: [
                    ...state.requests,
                    action.payload
                ]
            };
        case UPDATE:
            return {
                ...state,
                requests: state.requests.map((request) => (request.id === action.payload.id ? action.payload : request))
            };
        case DELETE:
            return {
                ...state,
                requests: state.requests.filter((request) => request.id !== action.payload)
            };
        default:
            return state;
    }
}
export default requestReducer;