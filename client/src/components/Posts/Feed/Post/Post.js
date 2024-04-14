import React,{useState,useEffect} from 'react';
import {Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import CommentIcon from '@mui/icons-material/Comment';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {Checkbox,Paper,Stack,Collapse,ButtonBase,TextField,Box,Avatar,Card,CardActions,CardContent,CardHeader,CardMedia,IconButton,Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import FileBase from 'react-file-base64';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { updatePost,updateAudiencePost, deletePost } from '../../../../actions/posts';
import {deleteLike, createLike} from '../../../../actions/reactions';
import lineBreak from '../../../../assets/icons/Line 2.png';
import EditAudience from './EditAudience';
import Friends from '../../../../assets/icons/friends.png';
import FriendsExcept from '../../../../assets/icons/friends_except.png';
import Lock from '../../../../assets/icons/padlock.png';
import PublicIcon from '@mui/icons-material/Public';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const Post = ({post,reaction,user,userProfile}) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const [formPost, setFormPost] = useState({content: ''});
  const [img, setImg] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAudience, setOpenAudience] = useState(false);
  const [openRecycleBin, setOpenRecycleBin] = useState(false);
  
  const [isLiked, setIsLiked] = useState(false);
  const [audienceValue, setAudienceValue] = useState(post.permission); //Permission post value
  const handleChangeAudience = (e) => {
    setAudienceValue(e.target.value);
    console.log({permission: audienceValue});
  }
  const handleChangeLike = (e) => {
    if(e.target.checked === true){
      setIsLiked(true);
      dispatch(createLike(user.user_id,{post: {postId: Number(post.postId)}}));
    }
    else{
      setIsLiked(false);
      dispatch(deleteLike(Number(post.postId), user.user_id));
    }
  }
  const handleShowImage = () => setIsShowImage(true);
  const handleCloseImage = () => {
    setIsShowImage(false)
    setImg(null);
  };
  const getFiles = (files) => {
    setImg(files);
    setFormPost({ ...formPost, photoInPost: {photoUrl: files.base64}});
  }
  const navigate = useNavigate();

  function handleClickOpen(id) {
    switch (id) {
      case 1:
        setOpenEdit(true);   
        break;
      case 2:
        setOpenAudience(true);
        break;
      case 3:
        setOpenRecycleBin(true);
        break;
      default:
        break;
    }
  }
  function handleClose(id){
    switch (id) {
      case 1:
        setOpenEdit(false);   
        break;
      case 2:
        setOpenAudience(false);
        break;
      case 3:
        setOpenRecycleBin(false);
        break;
      default:
        break;
    }
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleOpenProfile = () => {
    navigate(`/profile/${post?.user.user_id}`)
  }
  const handleChange = (e) => {
    setFormPost({ ...post, [e.target.name]: e.target.value});
  };
  const handleEditPost = (e) => {
    e.preventDefault();
    console.log(formPost);
    dispatch(updatePost(post.postId, formPost));
    window.location.reload(false);
  }
  const handleSubmitAudience = (e) => {
    e.preventDefault();
    if(post.permission === audienceValue){return null;}
    else{
      dispatch(updateAudiencePost(post.postId, {permission: audienceValue}));
    }
    window.location.reload(false);
  }
  const handleSubmitDeletePost = () => { // OK
    dispatch(deletePost(post.postId));
  }
  const openDetailPost = () => navigate(`/posts/${post.postId}`);
  useEffect(() => {
    if(reaction.filter((react) => react.userId.user_id === user.user_id && react.post.postId === post.postId).length !== 0){
      setIsLiked(true);
    }
    else{
      setIsLiked(false);
    }
  }, [post.postId, reaction, user.user_id])
  return (
    <Card sx={{ margin: 4,width: '800px', borderRadius: '30px',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 10px 15px' }} raised elevation = {6}>
      <CardHeader
        avatar={
          <IconButton onClick = {handleOpenProfile}>
            <Avatar sx = {{width: '60px',height:'60px',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 2px 8px'}} alt = 'avatar-test' src = {post?.user.avatar_url}/>
          </IconButton>
        }
        action={
          (user?.user_id === post?.user.user_id &&
          <>
            <IconButton onClick={handleExpandClick}>
              <MoreVert />
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Paper sx = {{marginLeft: -30,display: 'flex', flexDirection: 'column',alignItems: 'start', gap: '5px'}}>
                  <ButtonBase onClick = {() => handleClickOpen(2)}>
                    <Box display = 'flex' flexDirection = 'row' gap = '5px'>
                      <PublicIcon />
                      <Typography variant = 'text.secondary' fontWeight = 'bold'>Edit audience</Typography>
                    </Box>
                  </ButtonBase>
                  <ButtonBase onClick = {() => handleClickOpen(1)}>
                    <Box display = 'flex' flexDirection = 'row' gap = '5px'>
                      <EditOutlinedIcon />
                      <Typography variant = 'text.secondary' fontWeight = 'bold'>Edit Post</Typography>          
                    </Box>
                  </ButtonBase>
                  <img alt = 'icon' src = {lineBreak} width = '200px'/>
                  <ButtonBase onClick = {null}>
                    <Box display = 'flex' flexDirection = 'row' gap = '5px'>
                      <ArchiveOutlinedIcon />
                      <Typography variant = 'text.secondary' fontWeight = 'bold'>Move to archive</Typography>     
                    </Box>
                  </ButtonBase>
                  <ButtonBase onClick = {() => handleClickOpen(3)}>
                    <Box display = 'flex' flexDirection = 'row' gap = '5px'> 
                      <DeleteOutlinedIcon />
                      <Typography variant = 'text.secondary' fontWeight = 'bold'>Move to Recycle Bin</Typography>
                    </Box>
                  </ButtonBase>
                </Paper>
            </Collapse>
            {/* Open Edit Audience*/}
            <EditAudience openAudience = {openAudience} onClose = {() => handleClose(2)} audienceValue = {audienceValue} handleChangeAudience = {handleChangeAudience} handleSubmitAudience = {handleSubmitAudience}/>
            {/* Open Edit Post*/}
            <Dialog open = {openEdit} onClose = {() => handleClose(1)}>
                <DialogTitle sx = {{fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', display: 'flex', textAlign: 'center'}}>
                  Edit Post
                  <IconButton onClick = {() => handleClose(1)} >
                    <CancelOutlinedIcon fontSize = "large"/>
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <Box display='flex' flexDirection='column' sx = {{gap: '20px'}}>
                    <Box display='flex' flexDirection='row' sx = {{gap: '20px'}}>
                      <Avatar alt = {user?.result.name} src = {user?.result.picture || userProfile?.avatar_url } sx = {{width: '60px', height: '60px'}}/>
                      <Box display = 'flex' flexDirection = 'column' sx ={{gap: '3px', marginTop: '-5px'}}>
                        <Typography>{userProfile?.userName}</Typography>
                        <Box 
                          display= 'flex' flexDirection = 'row' justifyContent= 'center' alignItems='center' sx = {{width: '110px', height: '25px', background: '#A9A9A9',opacity: '0.8' ,borderRadius: '5px', gap: '5px', color: '#000000', cursor: 'pointer'}}>
                          {post.permission === "Public" && <PublicIcon fontSize='small'/> }
                          {post.permission === "Friends" && <img alt = 'icon' src = {Friends} width = "20%"/>}
                          {post.permission === "Friends except" && <img alt = 'icon' src = {FriendsExcept} width = "20%"/>}
                          {post.permission === "Only me" && <img alt = 'icon' src = {Lock} width = "20%"/>}
                          <div>{post.permission}</div>
                          <KeyboardArrowDownIcon fontSize = 'small'/>
                        </Box>
                      </Box>
                    </Box>
                    <TextField name = "content" onChange={handleChange} multiline label = "What's on your mind" fullWidth/>
                    {isShowImage && 
                      <Box display='flex' justifyContent = 'center' alignItems='center' width= "500px" height = "auto" minHeight = "300px" sx = {{border: '2px solid', borderRadius: '20px', borderStyle: 'groove'}}>
                        <IconButton onClick = {handleCloseImage} sx = {{position: 'absolute', right: '40px', bottom: '380px'}}>
                            <CancelOutlinedIcon />
                        </IconButton>
                        {!img && 
                          <FileBase multiple = {false} onDone = {getFiles} />
                        }
                        {img && <img alt = "postImage" src = {img["base64"]} width = "450px" height = 'auto' />}
                      </Box>
                    }
                    {!isShowImage && <Box width = "500px"/>}
                  </Box>
                </DialogContent>
                <DialogActions sx = {{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <Box display='flex' flexDirection = 'row' width='95%' height = 'auto' minHeight="40px" sx = {{justifyContent: 'space-between', alignItems: 'center',border: '2px solid', borderRadius: '10px', borderStyle: 'groove'}}>
                    <Typography sx = {{marginLeft: '20px'}}>Add to your post</Typography>
                      <IconButton onClick = {handleShowImage}><AddPhotoAlternateIcon /></IconButton>
                  </Box>
                <Button fullWidth variant='contained' onClick = {handleEditPost}>POST</Button>
                </DialogActions>
            </Dialog>
            {/* Open Recycle Bin*/}
            <Dialog open = {openRecycleBin} onClose = {() => handleClose(3)}>
              <DialogTitle sx = {{fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', display: 'flex', textAlign: 'center'}}>
                  Move to your recycle bin?
                  <IconButton onClick = {() => handleClose(3)} >
                    <CancelOutlinedIcon fontSize = "large"/>
                  </IconButton>
              </DialogTitle>
              <DialogContent>
              <Typography fontSize = "14px">Items in your recycle bin will be automatically deleted after 30 days. You can delete them from your recycle bin earlier by going to Activity log in your settings.</Typography>
              </DialogContent>
              <DialogActions>
                <Button variant = "text" onClick = {() => handleClose(3)}>
                  Cancel
                </Button>
                <Button variant = "contained" onClick = {handleSubmitDeletePost}>
                  Move
                </Button>
              </DialogActions>
            </Dialog>
          </>
          )
        }
        title={
            <Typography variant = 'h6' fontSize = '18px' fontWeight = '500'>{post?.user.userName}</Typography>
        }
        subheader={
            <Typography color = 'grey'>{moment(post?.createAt).format('LLLL')} .</Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {post?.content}
        </Typography>
      </CardContent>
      {post.photoInPost && (
        <ButtonBase sx = {{display: 'flex',flexDirection: 'column'}} onClick = {openDetailPost}>  
        <Box sx = {{height: 'auto',width:'800px' ,background: 'black',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <CardMedia
              sx = {{width: '100%', height: 'auto', objectFit: 'cover'}}
              component="img"
              image = {post.photoInPost.photoUrl}
              alt="img-post"
          />
        </Box>
      </ButtonBase>
      )
      }
      <CardActions sx = {{display: 'flex', flexDirection: 'column',alignItems: 'start', marginLeft: 2}}>
        {reaction.length !== 0 &&
          <>
          {isLiked === true ? 
          <Stack direction = 'row' justifyContent = 'center' alignItems = 'center'>
            <div style = {{borderRadius: 60, width: 30,height: 30, background: 'linear-gradient(180deg,rgba(66,103,178) 0%,rgba(33, 92, 255) 80%, rgba(54,90,189) 100%)',opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center',cursor: 'pointer'}}>
              <ThumbUpAltIcon fontSize = "small" sx = {{color: 'white'}}/>
            </div>
            <Typography variant = 'subtitle1' color = 'textSecondary' fontSize = '14px'>&nbsp;{reaction.length >= 2 ? `You and ${reaction.length - 1} others` : `${reaction.length} like${reaction.length > 1 ? 's' : ''}`}</Typography>
          </Stack>
          :
          <Stack direction = 'row' justifyContent = 'center' alignItems = 'center'>
            <div style = {{borderRadius: 60, width: 30,height: 30, background: 'linear-gradient(180deg,rgba(66,103,178) 0%,rgba(33, 92, 255) 80%, rgba(54,90,189) 100%)',opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <ThumbUpAltIcon fontSize = "small" sx = {{color: 'white'}}/>
            </div> 
          <Typography variant = 'subtitle1' color = 'textSecondary' fontSize = '14px'>&nbsp;{reaction.length} {reaction.length === 1 ? 'Like' : 'Likes'}</Typography>
          </Stack>
          }
          </> 
        }
        <Box sx ={{ paddingLeft: 2, opacity: 0.3, paddingBottom: 2}}>
          <img alt = 'icon' src = {lineBreak} width = '700px'/>
        </Box>
        <Box width = '100%' sx = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              onChange = {handleChangeLike}
              checked={isLiked}
              checkedIcon={<Favorite sx={{ color: "red" }} />}/>
        </IconButton>
        <IconButton onClick = {() => navigate(`/posts/${post.postId}`)}>
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Post;