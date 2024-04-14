import React from 'react'
import {Box,Paper,Grid,Typography,Button} from '@mui/material';
import PhotoCard from './PhotoCard';
const PhotoProfile = ({post}) => {
  return (
    <Box p={1} sx={{display: {xs: 'none',md: 'block'}}}>
      <Paper sx = {{width: 400, height: 430, borderRadius: 2, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <Box display = 'flex' flexDirection = "row" justifyContent = "space-between" alignItems = "center">
            <Typography variant = "body1" fontWeight = 'bold' sx = {{marginLeft: 2, marginTop: 2, marginBottom: 1}}>Photos</Typography>
            <Button variant = 'text'>See All Photos</Button>
        </Box>
        <Grid container spacing = {0.2} marginLeft = '10px'>
            {post.map((subPost) => (
                <PhotoCard key = {subPost?.photoInPost?.photoId} post = {subPost}/>
            ))    
            }
        </Grid>
      </Paper>
    </Box>
  )
}

export default PhotoProfile
