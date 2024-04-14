import React from 'react'
import {DialogActions,Button,Dialog,DialogTitle,Container,Paper,IconButton,DialogContent,Typography,Grid,FormControl,RadioGroup} from '@mui/material';
import CheckBox from '../../../widgets/Checkbox';
import World from '../../../../assets/icons/public.png';
import Friends from '../../../../assets/icons/friends.png';
import FriendsExcept from '../../../../assets/icons/friends_except.png';
import Lock from '../../../../assets/icons/padlock.png';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
const EditAudience = ({openAudience,onClose,audienceValue,handleChangeAudience,handleSubmitAudience,isFriendExcept,handleFriendExcept}) => {
  return (
    <Dialog open = {openAudience} onClose = {onClose}>
              <DialogTitle sx = {{fontWeight: 'bold', textAlign: 'center'}}>
                  <Container maxWidth = "xl">
                    <Paper sx = {{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
                      <div style={{marginLeft: '11rem'}}>Select Audience</div>
                      <IconButton onClick = {onClose} >
                        <CancelOutlinedIcon fontSize = "large"/>
                      </IconButton>
                    </Paper>
                  </Container>
              </DialogTitle>
              <DialogContent>
                <Typography fontSize = '16px' fontWeight='bold'>To help friends find you, your current profile picture can be seen by everyone.</Typography>
                <Typography variant = 'text.secondary'>You can decide who should see the other details, such as the description, likes or comments.</Typography>
                <Grid container spacing = {4} item xs = {12} sm = {12} md = {6} sx = {{marginTop: 2}}>
                  <FormControl>
                  <RadioGroup value = {audienceValue} onChange = {handleChangeAudience}>
                    <CheckBox icon = {World} title = "Public" subtitle = "Anyone on or off Memories"/>
                    <CheckBox icon = {Friends} title = "Friends" subtitle = "Your friends on Facebook ."/>
                    <CheckBox icon = {FriendsExcept} title = "Friends except" subtitle = "Don't show to some friends"/>
                    <CheckBox icon = {Lock} title = "Only me" subtitle = "Only you can see your post ."/>
                  </RadioGroup>
                  </FormControl>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button variant = "text" onClick = {onClose}>Cancel</Button>
                {!isFriendExcept ?
                  <Button variant = "contained" onClick = {handleSubmitAudience}>Save</Button>
                  : <Button variant = "contained" onClick = {handleFriendExcept}>Next</Button>
                }
              </DialogActions>
            </Dialog>
  )
}

export default EditAudience
