import React from 'react';
import {Box,Button,Dialog,DialogContent,DialogTitle,DialogActions, Typography} from '@mui/material';
import ListFriend from './ListFriend';
import {useSelector} from 'react-redux';
const EditFriendExcept = ({user,openFriendExcept, onClose}) => {
    const {requests} = useSelector((state) => state.requests);
    if(!requests) return "No requests found";
    const friends = requests.filter((rq) => rq.isAccepted === 1 && (rq.sendUser.user_id === user.user_id || rq.receiveUser.user_id === user.user_id))
    return (
        <Dialog open = {openFriendExcept} onClose = {onClose}>
            <DialogTitle sx = {{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>Friend except...</DialogTitle>
            <DialogContent>
                <Box display = 'flex' flexDirection = 'column' gap = '20px'>
                    <Typography variant="body1" color="initial" fontWeight="500">
                        Friends
                    </Typography>
                    {friends.map((friend) => (
                        <ListFriend key = {friend.reqId} friend = {friend} user = {user}/>
                    ))  
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant = "text" onClick = {onClose}>Cancel</Button>
                <Button variant = "primary">Save changes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditFriendExcept
