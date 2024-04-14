import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import GroupsIcon from '../../../assets/icons/group.png';
import GroupIcon from '../../../assets/icons/friend.png';

const SidebarFriend = () => {
  return (
    <Box flex={0.5} p={2} sx={{display: {xs: 'none',md: 'block', marginLeft: '-20px', background: 'white', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', height: '300px', width: '100%'}}}>
        <List>
            <ListItem>
                <ListItemButton component = {Link} to = '/friends'>
                <ListItemIcon>
                    <img alt = 'icon' src ={GroupsIcon} width = '40px'/>
                </ListItemIcon>
                <ListItemText primary = "Friends" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton component = {Link} to = '/friendRequest'>
                <ListItemIcon>
                    <img alt = 'icon' src ={GroupIcon} width = '40px'/>
                </ListItemIcon>
                <ListItemText primary = "Friend Request" />
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
  )
}

export default SidebarFriend;