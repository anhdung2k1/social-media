import React, {useState,useEffect} from 'react';
import {Box,ButtonBase,Dialog,IconButton, Typography, Button} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import useStyles from './styles';
import ProfileCard from '../../widgets/ProfileCard';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GroupIcon from '@mui/icons-material/Group';
import {useDispatch} from 'react-redux';
import { acceptUserFriendRequest, createFriendRequest } from '../../../actions/friendRequest';
import { deleteFriendRequest } from '../../../api';

const ProfileDetails = ({handleCoverImage,user, userProfile,userRequest,userResponse,id}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isResponse, setIsResponse] = useState(false);
    const [isRequest, setIsRequest] = useState(false);
    const [formData] = useState({
        sendUser: {
            user_id: user?.user_id
        }
    });
    const uResponse = userResponse.filter(rp => Number(rp.sendUser.user_id) === Number(id));
    const uRequest = userRequest.filter(rq => Number(rq.receiveUser.user_id) === Number(id));
    useEffect(() => {
        console.log("userRequest",userRequest);
        console.log("userResponse",userResponse);
        console.log("uResponse",uResponse);
        console.log("uRequest",uRequest);
        if(userRequest.length !== 0){
            setIsRequest(true);
        }
        if(userResponse.length ){
            setIsResponse(true);
        }
    },[uRequest, uResponse, userRequest, userResponse]);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      }
      const handleClose = () => {
        setOpen(false);
      }
    const handleCreateFriend = () => {
        dispatch(createFriendRequest(userProfile.user_id,formData));
        window.location.reload(false);
    }
    const handleAcceptRequest = () => {
        if(isResponse){
            dispatch(acceptUserFriendRequest(uResponse[0].reqId));
        }
        if(isRequest){
            dispatch(acceptUserFriendRequest(uRequest[0].reqId));
        }
        window.location.reload(false);
    }
    const handleDeleteRequest = () => {
        if(isResponse){
            dispatch(deleteFriendRequest(uResponse[0].reqId));
        }
        if(isRequest){
            dispatch(deleteFriendRequest(uRequest[0].reqId));
        }
        window.location.reload(false);
    }
    return (
        <Box flex = {4} p={2}>
        <Box className = {classes.cover_url} onClick = {handleCoverImage}>
            {userProfile?.cover_url != null || user?.result.picture != null ? 
                <div>
                    <img className = {classes.cover_url_img} alt = 'cover_url' src = {userProfile?.cover_url || user?.result.picture}/>
                </div>
            :  
            <>
            {userProfile?.user_id === user?.user_id && <>
                <Box sx = {{display: {xs: 'none', md: 'block'}}}>
                    <div className = {classes.btn_cover}>
                        <PhotoCameraIcon />
                        Edit Cover Photo
                    </div>
                    </Box>
                    <Box sx = {{display: {xs: 'block', md: 'none'}}}>
                    <Box className = {classes.btn_cover}>
                        <IconButton onClick = {handleCoverImage}>
                        <PhotoCameraIcon />
                        </IconButton>
                    </Box>
                </Box>
            </>}
            </>
            }
        </Box>
        <ProfileCard handleAvatarImage = {handleCoverImage} avatarUrl = {user?.result.picture || userProfile?.avatar_url} marginTop = "-143px" />
        {(userProfile?.user_id !== user?.user_id ) &&
            <Box display = 'flex' flexDirection = 'row' gap = '20px'>
                {(userRequest.length === 0 && userResponse.length === 0) ?
                <ButtonBase onClick = {handleCreateFriend} sx = {{display: 'flex',background: '#1B74E4', borderRadius: 2, width: 130, height: 40, color: 'white'}}>
                <Box display = 'flex' flexDirection = 'row' sx = {{gap: 1,alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                    <PersonAddAlt1Icon fontSize = "large"/>
                    <Typography fontWeight = 'bold'>Add friend</Typography>
                </Box>
                </ButtonBase>
                : 
                <>
                {userRequest.length !== 0 ? 
                <>
                {(uRequest[0]?.isAccepted === 0) ?
                    <>
                        {uRequest[0].receiveUser.user_id === user?.user_id ? <>
                            <ButtonBase onClick = {handleClickOpen} sx = {{display: 'flex',background: '#1B74E4', borderRadius: 2, width: 130, height: 40, color: 'white'}}>
                                <Box display = 'flex' flexDirection = 'row' sx = {{gap: 1,alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                                    <PersonAddAlt1Icon fontSize = "large"/>
                                    <Typography fontWeight = 'bold'>Respond</Typography>
                                </Box>
                            </ButtonBase>
                            <Dialog open = {open} onClose = {handleClose}>
                                <Button onClick = {handleAcceptRequest} variant = "text">Confirm</Button>
                                <Button onClick = {handleDeleteRequest} variant = "text">Delete Request</Button>
                            </Dialog>
                        </> :  
                        <>
                        <ButtonBase onClick = {handleDeleteRequest} sx = {{display: 'flex',background: '#1B74E4', borderRadius: 2, width: 130, height: 40, color: 'white'}}>
                                <Box display = 'flex' flexDirection = 'row' sx = {{gap: 1,alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                                    <PersonAddAlt1Icon fontSize = "large"/>
                                    <Typography fontWeight = 'bold'>Cancel</Typography>
                                </Box>
                        </ButtonBase>
                        </>    
                         }
                    </>
                 : 
                 <>
                    <ButtonBase onClick = {handleClickOpen} sx = {{display: 'flex',background: '#1B74E4', borderRadius: 2, width: 130, height: 40, color: 'white'}}>
                    <Box display = 'flex' flexDirection = 'row' sx = {{gap: 1,alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                        <GroupIcon fontSize = "large"/>
                        <Typography fontWeight = 'bold'>Friend</Typography>
                    </Box>
                    </ButtonBase>
                    <Dialog open = {open} onClose = {handleClose}>
                        <Button onClick = {handleDeleteRequest} variant = "text">Unfriend</Button>
                    </Dialog>
                </>
                }
                </>
                :
                <>
                {(uResponse[0]?.isAccepted === 0) ?
                    <>
                        {uResponse[0].receiveUser.user_id === user?.user_id ? <>
                            <ButtonBase onClick = {handleClickOpen} sx = {{display: 'flex',background: '#1B74E4', borderRadius: 2, width: 130, height: 40, color: 'white'}}>
                                <Box display = 'flex' flexDirection = 'row' sx = {{gap: 1,alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                                    <PersonAddAlt1Icon fontSize = "large"/>
                                    <Typography fontWeight = 'bold'>Respond</Typography>
                                </Box>
                            </ButtonBase>
                            <Dialog open = {open} onClose = {handleClose}>
                                <Button onClick = {handleAcceptRequest} variant = "text">Confirm</Button>
                                <Button onClick = {handleDeleteRequest} variant = "text">Delete Request</Button>
                            </Dialog>
                        </> :  
                        <>
                        <ButtonBase onClick = {handleDeleteRequest} sx = {{display: 'flex',background: '#1B74E4', borderRadius: 2, width: 130, height: 40, color: 'white'}}>
                                <Box display = 'flex' flexDirection = 'row' sx = {{gap: 1,alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                                    <PersonAddAlt1Icon fontSize = "large"/>
                                    <Typography fontWeight = 'bold'>Cancel</Typography>
                                </Box>
                        </ButtonBase>
                        </>    
                            }
                    </>
                 : 
                 <>
                    <ButtonBase onClick = {handleClickOpen} sx = {{display: 'flex',background: '#1B74E4', borderRadius: 2, width: 130, height: 40, color: 'white'}}>
                    <Box display = 'flex' flexDirection = 'row' sx = {{gap: 1,alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                        <GroupIcon fontSize = "large"/>
                        <Typography fontWeight = 'bold'>Friend</Typography>
                    </Box>
                    </ButtonBase>
                    <Dialog open = {open} onClose = {handleClose}>
                        <Button onClick = {handleDeleteRequest} variant = "text">Unfriend</Button>
                    </Dialog>
                </>
                }
                </>
                }
                </>
                }
                <ButtonBase onClick = {null} sx = {{display: 'flex',background: '#E4E6EB', borderRadius: 2, width: 130, height: 40, color: 'black'}}>
                    <Box display = 'flex' flexDirection = 'row' sx = {{gap: 1,alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                        <MailOutlineIcon fontSize = "large"/>
                        <Typography fontWeight = 'bold'>Message</Typography>
                    </Box>
            </ButtonBase>
        </Box>
        }
    </Box>
    )
}

export default ProfileDetails;