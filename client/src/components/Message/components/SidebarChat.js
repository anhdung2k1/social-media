import React from 'react'
import {Box, Avatar,ButtonBase} from '@mui/material';
import memoLogo from '../../../assets/icons/memories-Logo.png';
import {useNavigate} from 'react-router-dom';

const SidebarChat = () => {
  const navigate = useNavigate();
  return (
    <Box flex = {0.2} sx={{display: {xs: 'none',md: 'block' ,background: '#575757'}}}>
        <ButtonBase onClick = {() => navigate(`/posts`)}>
          <Box display = 'flex' justifyContent = 'center' alignItems = 'center' margin = '20px 5px' sx = {{background: '#D9D9D9', width: '60px', height: '60px',borderRadius: 30}} >
              <Avatar alt = "groups" src = {memoLogo}/>
          </Box>
        </ButtonBase>
    </Box>
  )
}

export default SidebarChat
