import React,{useEffect} from 'react';
import { Box,Stack } from '@mui/material';
import NavbarPost from '../Navbar/NavbarPost/NavbarPost';
import FriendFeeds  from './FriendFeeds/FriendFeeds';
import SidebarFriend from './SidebarFriend/SidebarFriend';
import {useDispatch} from 'react-redux';
import {getRequestByReceiveUserId} from '../../actions/friendRequest';
import { useLocation } from 'react-router-dom';
import {getUser} from '../../actions/users';

//OK
const FriendRequests = ({user,setUser,userProfile}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(getUser(user?.user_id));
        dispatch(getRequestByReceiveUserId(user?.user_id));
    },[dispatch,user?.user_id,location]);
    return (
        <Box>
          <NavbarPost user = {user} setUser = {setUser} userProfile = {userProfile} />
          <Stack direction = 'row' justifyContent="space-between">
            <SidebarFriend />
            <FriendFeeds user = {user} />
          </Stack>
        </Box>
      )
}

export default FriendRequests
