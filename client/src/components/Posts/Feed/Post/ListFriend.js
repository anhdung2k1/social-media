import React from 'react'
import {Typography,Box,Avatar} from '@mui/material';
import RemoveCircleOutlineTwoToneIcon from '@mui/icons-material/RemoveCircleOutlineTwoTone';
const ListFriend = ({friend,user}) => {
  return (
    <>
    {friend.sendUser.user_id === user.user_id ?
    <Box display = 'flex' flexDirection = 'row' justifyContent = 'space-between' alignItems = 'center' width = '500px' height = '50px' sx = {{'&:hover': {background: 'whitesmoke'},opacity: 1.4, borderRadius: 2, margin: '2px 5px 1px 1px',cursor: 'pointer'}}>
        <Box display = 'flex' flexDirection = 'row' gap = '10px'>
            <Avatar alt = "avatar" src = {friend.receiveUser.avatar_url}/>
            <Typography fontWeight = "normal" variant = "body1" sx = {{marginTop:'-10px',display:'flex',justifyContent: 'center', alignItems: 'center'}}>{friend.receiveUser.userName}</Typography>
        </Box>
        <RemoveCircleOutlineTwoToneIcon sx = {{opacity: 0.6}}/>
     </Box>
     :
     <Box display = 'flex' flexDirection = 'row' justifyContent = 'space-between' alignItems = 'center' width = '500px' height = '50px' sx = {{'&:hover': {background: 'whitesmoke'},opacity: 1.4, borderRadius: 2, margin: '2px 5px 1px 1px',cursor: 'pointer'}}>
        <Box display = 'flex' flexDirection = 'row' gap = '10px'>
            <Avatar alt = "avatar" src = {friend.sendUser.avatar_url}/>
            <Typography fontWeight = "normal" variant = "body1" sx = {{marginTop:'-10px',display:'flex',justifyContent: 'center', alignItems: 'center'}}>{friend.sendUser.userName}</Typography>
        </Box>
        <RemoveCircleOutlineTwoToneIcon sx = {{opacity: 0.6}}/>
     </Box>
    }
     </>
  )
}

export default ListFriend
