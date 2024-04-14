import React,{useEffect} from 'react';
import {Stack,Box} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import NavBarPost from '../Navbar/NavbarPost/NavbarPost';
import NotificationFeed from './components/NotificationFeed/NotificationFeed';
import NotificationSettings from './components/NotificationSettings/NotificationSettings';
import {getNotifications} from '../../actions/notifications';
import {getUser} from '../../actions/users';
const Notifications = ({user,setUser,userProfile}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getNotifications());
    dispatch(getUser(user?.user_id));
  },[dispatch, location, user?.user_id]);

  return (
      <Box >
        <NavBarPost user = {user} setUser = {setUser} userProfile = {userProfile} />
        <Stack direction = "row" justifyContent="space-evenly">
            <NotificationSettings />
            <NotificationFeed user = {user} />
        </Stack>
      </Box>
  )
}

export default Notifications
