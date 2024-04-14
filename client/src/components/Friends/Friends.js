import { Box,Stack } from '@mui/material';
import React, {useEffect} from 'react';
import NavbarPost from '../Navbar/NavbarPost/NavbarPost';
import ListFriendFeeds from './FriendFeeds/ListFriendFeeds';
import SidebarFriend from './SidebarFriend/SidebarFriend';
import {useDispatch} from 'react-redux';
import {getRequests} from '../../actions/friendRequest';
import {getUser} from '../../actions/users';
import {useLocation} from 'react-router-dom';

//OK
const Friends = ({user,setUser,userProfile}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getUser(user?.user_id));
    dispatch(getRequests());
  },[dispatch,user?.user_id,location]);
  return (
    <Box>
      <NavbarPost user = {user} setUser = {setUser} userProfile = {userProfile} />
      <Stack direction = 'row' justifyContent="space-between">
        <SidebarFriend />
        <ListFriendFeeds user={user}/>
      </Stack>
    </Box>
  )
}

export default Friends;
