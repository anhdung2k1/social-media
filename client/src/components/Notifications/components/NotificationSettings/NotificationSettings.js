import React from 'react'
import {Box, Stack,Typography} from '@mui/material';
import {Link} from 'react-router-dom';
const NotificationSettings = () => {
  return (
    <Box width = "200px" height = "100px" sx = {{borderRadius: '5px', backgroundColor: 'white',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
      <Stack direction = "column" justifyContent = "space-evenly" margin = "10px 20px">
        <Typography variant = "h6" fontSize = "16px" fontWeight = "500">
            Manage your<div>Notifications</div>
        </Typography>
        <Link to = "">
            <Typography variant = "h6" fontSize = "14px">View Settings</Typography>
        </Link>
      </Stack>
    </Box>
  )
}

export default NotificationSettings
