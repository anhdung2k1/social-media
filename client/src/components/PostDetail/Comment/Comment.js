import React,{useState} from 'react';
import {DialogActions,TextField,Dialog,IconButton,Stack,Box,Avatar,Typography,ButtonBase,Tooltip,Button} from '@mui/material';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {deleteComment,updateComment} from '../../../actions/comment';

const Comment = ({user,comment}) => {
  const dispatch = useDispatch();
  const [formComment, setFormComment] = useState({cmtContent: comment.cmtContent});
  const [open,setOpen] = useState(false);
  const [openEdit,setOpenEdit] = useState(false);
  const handleOpen = (id) => {
    switch (id) {
      case 1:
        setOpen(true);
        break;
      case 2:
        setOpenEdit(true);
        break;
      default:
        break;
    }
  }
  const handleClose = (id) => {
    switch (id) {
      case 1:
        setOpen(false);
        break;
      case 2:
        setOpenEdit(false);
        break;
      default:
        break;
    }
    
  }
  const handleDelete = () => {
    dispatch(deleteComment(comment.cmtId)); // OK
    window.location.reload(false);
  }
  const handleChange = (e) => {
    setFormComment({...formComment,[e.target.name]: e.target.value});
  }
  const handleSubmit = (e) => {
    if(e.keyCode === 13 || e.key === 'Enter'){
      dispatch(updateComment(comment.cmtId,formComment));
      handleClose(2);
    }
    if(e.keyCode === 24){
      handleClose(2);
    }
  }
  const formatDate = () => {
    if(moment().diff(moment(comment.createAt), 'days') < 1){
      return moment(comment.createAt).locale('vi').fromNow();
    }
    else if(moment().diff(moment(comment.createAt), 'days' < 7)){
      return moment(comment.createAt).locale('vi').format('dddd');
    }
    else{
      return moment(comment.createAt).locale('vi').format('L');
    }
  }
  return (
    <Box display = 'flex' flexDirection = 'row' marginLeft = '10px' marginTop = '20px' gap = '10px'>
      <Avatar alt = "avatar" src = {comment?.users?.avatar_url} />
      <Box flexDirection = 'column'>
      <Box sx = {{background: 'whitesmoke',display: 'flex', flexDirection: 'row', borderRadius: 5, minHeight: 70,width: 400}}>
        <Box sx ={{flexDirection: 'column',display: 'flex',justifyContent: 'center', wordWrap: 'break-word',whiteSpace: 'pre-wrap'}}>
          <Stack direction = "row" justifyContent = "space-between">
            <Typography sx = {{marginLeft: 3,marginBottom: 0.5,fontWeight: '600',opacity: 0.8}}>{comment?.users?.userName}</Typography>
            {user?.user_id === comment?.users?.user_id && <IconButton onClick = {() => handleOpen(1)}>
              <MoreHorizIcon />
            </IconButton>}
            <Dialog open = {open} onClose = {() => handleClose(1)}>
              <Button onClick = {() => handleOpen(2)}>Edit</Button>
              <Dialog open = {openEdit} onClose = {() => handleClose(2)}>
                <TextField name = "cmtContent" variant = "filled" size = "small" onKeyPress={handleSubmit} onChange={handleChange} multiline label = "Edit Comment" value = {formComment.cmtContent} fullWidth InputProps = {{ disableUnderline: true}} sx = {{marginLeft: 2,marginRight: 2}}/>
                <div style = {{display: 'flex', flexDirection: 'row', gap: 4}}>Press ESC to <div onClick = {() => handleClose(2)} style = {{cursor: 'pointer', '&:hover': {textDecoration: 'underline wavy blue 5px'}, color: '#1876F2'}}>cancel</div></div>
                <DialogActions>
                  <Button fontSize = "small" variant = "text" onClick = {() => handleClose(2)}>Cancel</Button>
                </DialogActions>
              </Dialog>
              <Button onClick = {handleDelete}>Delete</Button>
            </Dialog>
          </Stack>
          <Typography sx = {{marginLeft: 3, marginTop: -1}}>{comment.cmtContent}</Typography>
        </Box>
      </Box>
      <Box display = 'flex' flexDirection = 'row' justifyContent = 'space-between' width = '200px' marginLeft = '20px' marginTop = '5px'>
        <ButtonBase onClick = {console.log("Click Like")} sx = {{fontWeight: 'bold', opacity: 0.7, '&:hover': {textDecoration: 'underline'}}}>Like</ButtonBase>
        <ButtonBase onClick = {console.log("Reply")} sx = {{fontWeight: 'bold', opacity: 0.7, '&:hover': {textDecoration: 'underline'}}}>Reply</ButtonBase>
        <Tooltip title = {moment(comment.createAt).format('LLLL')}>
          <Box sx = {{fontWeight: 'bold', opacity: 0.6,fontSize: 14,cursor: 'pointer','&:hover': {textDecoration: 'underline'}}}>{formatDate()}</Box>
        </Tooltip>
      </Box>
      </Box>
    </Box>
  )
}

export default Comment