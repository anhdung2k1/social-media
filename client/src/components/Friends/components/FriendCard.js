import { Card, CardMedia,Button, Typography, ButtonBase } from '@mui/material';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import Avatar from '../../../assets/icons/user.png';
import { acceptUserFriendRequest,deleteFriendRequest } from '../../../actions/friendRequest';
import { useNavigate } from 'react-router-dom';
const FriendCard = ({userRequest}) => {
  const [formData] = useState({
    reqId: userRequest?.reqId
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAcceptRequest = () => {
    dispatch(acceptUserFriendRequest(formData.reqId));
    window.location.reload(false);
  }
  const handleDeleteRequest = () => {
    dispatch(deleteFriendRequest(formData.reqId));
    window.location.reload(false);
  }
  return (
    <>
    {!userRequest?.isAccepted ? (
        <ButtonBase onClick = {() => navigate(`/profile/${userRequest.sendUser.user_id}`)}>
        <Card sx = {{maxWidth: 200, borderRadius: 5,margin: '10px 1rem 2px'}}>
            <CardMedia 
                sx = {{height: 160, borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}
                image = {userRequest?.sendUser.avatar_url || Avatar}
            />
            <Typography variant="h7" fontFamily="Helvetica" paddingLeft = '2px'>{userRequest?.sendUser.userName}</Typography>
            <Button variant = "contained" fullWidth onClick = {handleAcceptRequest} sx = {{borderRadius: 20, marginTop: '20px'}}>Confirm</Button>
            <Button variant = "outlined" fullWidth onClick = {handleDeleteRequest} sx = {{borderRadius: 20, marginTop: '5px'}}>Delete</Button>
        </Card>
        </ButtonBase>
    ) : null
    }
    </>
  )
}

export default FriendCard;