import {combineReducers} from 'redux';
import auth from './auth.js';
import posts from './posts.js';
import users from './users.js';
import requests from './requests.js';
import comments from './comments.js';
import searches from './searches.js';
import reactions from './reactions.js';
import notifications from './notifications.js';
import messages from './messages.js';
import rooms from './rooms.js';

export default combineReducers({
    auth,posts,users,requests,comments,searches,reactions,notifications,messages,rooms
});