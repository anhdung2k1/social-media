import React,{useState,useEffect} from 'react';
import {Box,Stack,ThemeProvider,createTheme} from '@mui/material';
import NavBarPost from '../Navbar/NavbarPost/NavbarPost';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getRequests} from '../../actions/friendRequest';
import {getUser} from '../../actions/users';
import Sidebar from '../Posts/Sidebar/Sidebar';
import Feed from '../Posts/Feed/Feed';
import Rightbar from '../Posts/Rightbar/Rightbar';
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const SearchPosts = ({user,setUser, userProfile}) => {
    const query = useQuery();
    const [mode,setMode] = useState('light');
    const location = useLocation();
    const dispatch = useDispatch();
    let page = query.get('pageNo');
    useEffect(() => {
      dispatch(getRequests());
      dispatch(getUser(user?.user_id));
    }, [dispatch,user?.user_id,location]);
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
  
  export default SearchPosts