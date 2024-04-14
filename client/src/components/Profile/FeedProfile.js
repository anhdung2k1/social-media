import React from 'react';
import {Grid,Box,Stack} from '@mui/material';
import { useSelector } from 'react-redux';
import AddPost from '../Posts/Feed/Post/AddPost';
import Post from '../Posts/Feed/Post/Post';
import PhotoProfile from './PhotoProfile/PhotoProfile';
const FeedProfile = ({user, userProfile}) => {
  const {postUser} = useSelector((state) => state.posts);
  const {reactions} = useSelector((state) => state.reactions);

  if(!postUser) return 'No post user';
  if(!reactions) return "No reactions";
  return (
    (postUser ? 
      <Stack direction = "row">
        <Box flex = {3} p={1} sx = {{width: '100%', height: 'auto'}}>
          <AddPost user = {user} userProfile = {userProfile} /> 
          {postUser.map((post) => (
            <Grid key={post.postId} item xs={12} sm={12} md={6} lg= {3}>
              <Post post = {post} reaction = {reactions.filter((react) => react.post.postId === post.postId)} user = {user} userProfile = {userProfile}/>
            </Grid>
          ))} 
        </Box>
        <PhotoProfile post = {postUser}/>
    </Stack>
    : null
    )
  )
}
export default FeedProfile;