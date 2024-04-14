import React,{useState,useEffect} from 'react';
import {Box,Stack,ThemeProvider,createTheme} from '@mui/material';
import NavBarPost from '../Navbar/NavbarPost/NavbarPost';
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import Rightbar from './Rightbar/Rightbar';
import { useDispatch } from 'react-redux';
import {useLocation} from 'react-router-dom';
import { getUser } from '../../actions/users';
import { getPosts } from '../../actions/posts';
import {getRequests} from '../../actions/friendRequest';
import {getLikes} from '../../actions/reactions';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Posts = ({user,setUser, userProfile}) => {
  const query = useQuery();
  const [mode,setMode] = useState('light');
  const location = useLocation();
  const dispatch = useDispatch();
  let page = query.get('pageNo');
  useEffect(() => {
    dispatch(getPosts(Number(page) || Number(1)));
    dispatch(getRequests());
    dispatch(getUser(user?.user_id));
    dispatch(getLikes());
  }, [dispatch,user?.user_id,location,page]);
  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  });

  return (
    <ThemeProvider theme = {darkTheme}>
      <Box bgcolor = {"background.light"} color = {'text.primary'}>
        <NavBarPost user = {user} setUser = {setUser} userProfile = {userProfile} />
        <Stack direction = "row" justifyContent="space-between">
          <Sidebar setMode = {setMode} mode = {mode} user = {user} setUser = {setUser} userProfile = {userProfile} />
          <Feed user = {user} userProfile = {userProfile} />
          <Rightbar page = {page}/>
        </Stack>
      </Box>
    </ThemeProvider>
  )
}

export default Posts
