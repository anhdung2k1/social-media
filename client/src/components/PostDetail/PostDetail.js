import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material';
import {ButtonBase, Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Paper, Typography,Box,TextField } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import moment from 'moment';
import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getPost } from '../../actions/posts';
import { getCommentByPostId,createCommentByUserId } from '../../actions/comment';
import { getUser } from '../../actions/users';
import NavbarPost from '../Navbar/NavbarPost/NavbarPost';
import lineBreak from '../../assets/icons/Line 2.png';
import Comment from './Comment/Comment';

const PostDetail = ({user,setUser,userProfile}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {id} = useParams();
  const [comment,setComment] = useState('');
  const [formComment, setFormComment] = useState({cmtContent: comment.cmtContent});
  const [readMore,setReadMore] = useState(false);
  const linkName = readMore ? 'See less' : 'See More';
  const {post} = useSelector((state) => state.posts);
  const {comments} = useSelector((state) => state.comments);
  const handleChange = (e) => {
    setComment(e.target.value);
    setFormComment({...formComment,[e.target.name]: e.target.value});
  }
  const handleSubmit = (e) => {
    if(e.keyCode === 13 || e.key === 'Enter'){
      dispatch(createCommentByUserId(user.user_id,id,formComment));
      setComment('');
      setFormComment({cmtContent: ''});
    }
  }
  useEffect(() =>{
      dispatch(getPost(id));
      dispatch(getUser(user?.user_id));
      dispatch(getCommentByPostId(id));
    },[dispatch,id,location,user?.user_id]);

  if(!post) { return "No post found";}
  if(!comments) {return "No Comments";}
  if(!userProfile) return 'No user';
  return (
    <Box>
        <NavbarPost user = {user} setUser = {setUser} userProfile = {userProfile}/>
        <Box width = '1300px'>
          <Paper sx = {{height: '900px', display: 'flex', flexDirection: 'row'}}>
              <Card >
                <Box flex = {2}>
                {post.photoInPost &&  (
                  <Box sx = {{overflow: 'scroll', whiteSpace: 'nowrap',height: 'auto',width:'800px' ,background: 'black',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <CardMedia
                        sx = {{width: '100%', height: 'auto', objectFit: 'cover'}}
                        component="img"
                        image = {post.photoInPost.photoUrl}
                        alt="img-post"
                    />
                  </Box>
                )    
                  }
                </Box>
              </Card>
              <Box>
              <Box width = '500px' marginLeft = '20px'>
                    <CardHeader
                      avatar={
                        post !== null && 
                          <Avatar sx = {{width: '60px',height:'60px',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 2px 8px'}} alt = 'avatar-test' src = {post?.user.avatar_url}/>
                      }
                      action={
                        <IconButton aria-label="settings" onClick={null}>
                          <MoreVert />
                        </IconButton>
                      }
                      title={
                          <Typography variant = 'h6' fontSize = '18px' fontWeight = '500'>{post?.user.userName}</Typography>
                      }
                      subheader={
                          <Typography color = 'grey'>{moment(post?.createAt).format('LLLL')} .</Typography>
                      }
                    />
                    <CardContent sx = {{height: '100px'}}>
                      <Typography variant="body2" color="text.secondary">
                          {post.content.length <= 255 ? post?.content : (<div>
                            {!readMore && post?.content.substring(0,255)} 
                            {readMore && post.content}
                            <strong style = {{marginLeft: 3, cursor: 'pointer'}} onClick = {() => setReadMore(!readMore)}>
                              {linkName}
                            </strong>
                          </div>)}
                      </Typography>
                    </CardContent>
                    <Box sx ={{ paddingLeft: 2, opacity: 0.3}}>
                      <img alt = 'icon' src = {lineBreak} width = '450px'/>
                    </Box>
                    <CardActions sx = {{marginLeft: '20px',display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <IconButton onClick = {null} sx = {{gap: 1, opacity: 0.8}}>
                          <Checkbox
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite sx={{ color: "red" }} />}
                          />
                          <Typography variant="body2" color="text.secondary">Like</Typography>
                        </IconButton>
                        <IconButton onClick = {null} sx = {{gap: 1, opacity: 0.8}}>
                          <CommentIcon />
                          <Typography variant="body2" color="text.secondary">Comment</Typography>
                        </IconButton>
                        <IconButton onClick = {null} sx = {{gap: 1, opacity: 0.8}}>
                          <Share />
                          <Typography variant="body2" color="text.secondary">Share</Typography>
                        </IconButton>
                    </CardActions>
                    <Box sx ={{ paddingLeft: 2, opacity: 0.3}}>
                      <img alt = 'icon' src = {lineBreak} width = '450px'/>
                    </Box>
                    <Box display = 'flex' flexDirection = 'row' sx = {{width: 480, background: 'white',borderRadius: '30px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                      <ButtonBase onClick = {() => navigate(`/profile/${user?.user_id}`)}>
                      {userProfile.avatar_url !== null && <Avatar alt = "avatar" src = {userProfile.avatar_url}/>}
                      </ButtonBase>
                      <TextField name = "cmtContent" variant = "filled" size = "small" value = {comment} onKeyPress={handleSubmit} onChange={handleChange} multiline label = "Write a comment..." fullWidth InputProps = {{ disableUnderline: true}} sx = {{marginLeft: 2,marginRight: 2}}/>
                    </Box> 
                    <Box display = 'flex' flexDirection = 'column' height = "500px" sx = {{overflow: 'scroll', whiteSpace: 'nowrap', marginTop: 1}}>
                      {comments.map((comment) => (
                        <Comment key = {comment.cmtId} user = {user} comment = {comment}/>
                      ))}
                    </Box>
                </Box> 
              </Box>
          </Paper>
        </Box>
    </Box>
  )
}

export default PostDetail;
