import React,{useState,useEffect} from 'react';
import {DialogActions,DialogContentText,DialogContent,DialogTitle,Dialog,Box, List,ListItem,Button,ListItemIcon,ListItemText, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import PersonIcon from '@mui/icons-material/Person';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ManIcon from '@mui/icons-material/Man';
import BusinessIcon from '@mui/icons-material/Business';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useDispatch, useSelector } from 'react-redux';

import {updateUser} from '../../../actions/users';
import Input from '../../widgets/Input';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import FileBase from 'react-file-base64';
import { useParams } from 'react-router-dom';

const EditProfile = ({user, userProfile}) => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [formData, setFormData] = useState({
    user_id: id,
    userName: "",
    birth_day: "",
    address: "",
    relationship: "",
    gender: "",
    follower: null,
    cover_url: null,
    avatar_url: null
});
  const [open, setOpen] = useState(false);
  const {request,requests} = useSelector((state) => state.requests);
  useEffect(() => {
    console.log("Request:" ,request);
    console.log("Requests:" ,requests);
  })
  if(!request || !requests) return 'no request';
  const userRequest = request.filter(rq => Number(rq.receiveUser.user_id) === Number(id)); // PASS TEST CASE ADD NEW FRIEND
  const userResponse = requests.filter((rq,rp) => ((Number(rq.receiveUser.user_id) === Number(user.user_id))));
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleEditProfile = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateUser(formData, id)); // OK -- update completed
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }
  return (
    <>
        <ProfileDetails handleCoverImage = {handleClickOpen} user = {user} userProfile = {userProfile} userRequest = {userRequest} userResponse = {userResponse} id = {id}/>
        <Box p = {1} flex = {1}>
        <Box display = 'flex' flexDirection = 'column' sx = {{borderRadius: '20px',background :"#FFF", width :'100%', height: 'auto', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
        <List>
            {(userProfile?.user_id === user?.user_id) &&
            <ListItem>
            <ListItemIcon>
                <EditIcon />
            </ListItemIcon>
            <ListItemText primary = "Edit Profile"/>
                <ListItemText primary = {<Typography noWrap>Edit Your Profile</Typography>} />
                <Box sx = {{position: 'static', right: '20px'}} component = {Button} onClick = {handleClickOpen}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                </Box>
                <div>
                <Dialog open = {open} onClose = {handleClose}>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Customise your Intro
                            <div style={{marginBottom: '20px'}}>Details you select will be public</div>
                        </DialogContentText>
                        <Box style={{gap: '10px', display: 'flex', flexDirection: 'column',width: '500px'}}>
                            <Input name = "userName" defaultValue={userProfile?.userName} label = "User Name"  handleChange = {handleChange} autoFocus/>
                            <Input name = "birth_day" defaultValue={userProfile?.birth_day} label = "Birth Day" handleChange = {handleChange} autoFocus/>
                            <Input name = "gender" defaultValue={userProfile?.gender} label = "Gender" handleChange = {handleChange} autoFocus/>
                            <Input name = "address" defaultValue={userProfile?.address} label = "Address" handleChange = {handleChange} autoFocus/>
                            <Input name = "relationship" defaultValue={userProfile?.relationship} label = "Relationships" handleChange = {handleChange} autoFocus/>
                            <div>
                                <Typography>Change Cover Image</Typography>
                                <FileBase 
                                    type = 'file'
                                    multiple = {false}
                                    onDone = {({base64}) => setFormData({...formData, cover_url: base64})}
                                />
                            </div>
                            <div>
                                <Typography>Change Avatar Image</Typography>
                                <FileBase 
                                    type = 'file'
                                    multiple = {false}
                                    onDone = {({base64}) => setFormData({...formData, avatar_url: base64})}
                                />
                            </div>
                        </Box>        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = {handleClose}>Cancel</Button>
                        <Button onClick = {handleEditProfile}>Submit</Button>
                    </DialogActions>
                </Dialog>
                </div>
            </ListItem>
            }
            <ListItem>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary = "Name" secondary = "Full Name"/>
                <ListItemText primary = {<Typography noWrap>{userProfile?.userName || user?.result.name || 'Select your username'}</Typography>} />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <CelebrationIcon />
                </ListItemIcon>
                <ListItemText primary = "Birthday" />
                <ListItemText primary = {
                    <Typography noWrap>{userProfile?.birth_day || "Select your birthday"}</Typography>}/>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <ManIcon />
                </ListItemIcon>
                <ListItemText primary = "Gender" />
                <ListItemText primary = {
                    <Typography noWrap>{userProfile?.gender || "Select your gender"}</Typography>}/>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary = "Address" />
                <ListItemText primary = {
                    <Typography noWrap>{userProfile?.address || "Add your address"}</Typography>}/>

            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary = "Relationship" />
                <ListItemText primary = {
                    <Typography noWrap>{userProfile?.relationship || 'Chưa có mối quan hệ nào'}</Typography>}/>
            
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary = "Create At" />
                <ListItemText primary = {
                    <Typography color = "primary" fontWeight = '400' noWrap>{moment(userProfile?.createAt,"YYYYMMDD").fromNow()}</Typography> }/>
                 <ListItemIcon>
                    <AccessTimeIcon />
                </ListItemIcon>
            </ListItem>
        </List>
      </Box>
    </Box>
    </>
  )
}

export default EditProfile;
