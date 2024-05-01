import {FETCH_ROOM,FETCH_ALL, CREATE, DELETE} from "../constants/actionTypes";

const initialState = {
    isLoading: false,
    rooms: [],
    room: null,
    error: null
};

const roomReducer = (state = initialState, action) => {
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
            return{
                ...state,
                rooms: action.payload.data
            }
        case FETCH_ROOM:
            return {
                ...state,
                room: action.payload.room,
                error: null
            };
        case CREATE:
            return {
                ...state,
                rooms: [
                    ...state.rooms,
                    action.payload
                ]
            };
        case DELETE:
            return {
                ...state,
                rooms: state.rooms.filter((room) => room.roomId !== action.payload)
            };
        default:
            return state;
    }
}
export default roomReducer;