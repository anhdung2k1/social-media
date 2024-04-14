import React from 'react'
import {Box, Paper, Typography,IconButton} from '@mui/material';
import InfoIcon from '../../../assets/icons/info 1.png';
import Online from '../../../assets/icons/online.png';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
const HeaderChat = () => {
  return (
        <Paper sx = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Box sx = {{display: 'flex', flexDirection: 'row',justifyContent: 'center', alignItems: 'center',margin: '5px 15px', gap: 2}}>
                <Typography variant = 'body1' fontSize = '24px' fontWeight = 'bold'>
                    Conversation
                </Typography>
                <IconButton onClick = {null}><img alt = "img_icon" src = {InfoIcon} width = '30px' height = '30px'/></IconButton>
            </Box>
            <Box sx = {{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.2}}>
                <img alt = "img_icon" src = {Online} width = '20px' height = '20px' />
                <Typography variant = 'body2'>Online</Typography>
                <IconButton onClick = {null}><LocalPhoneIcon color = "primary"/></IconButton>
                <IconButton onClick = {null}><VideoCameraBackIcon color = "primary"/></IconButton>
            </Box>
        </Paper>
  )
}

export default HeaderChat
