import { Box,Grid, Container, Skeleton } from '@mui/material';
import React,{useEffect} from 'react'
import FriendCard from '../components/FriendCard';
import {useSelector} from 'react-redux';
const FriendFeeds = () => {
  const {isLoading,request} = useSelector((state) => state.requests);
  useEffect(() => {
    console.log(request);
  });
  if((isLoading && !request) || !request) return 'No friends request found';
  return (
    isLoading ? (
      <Container >
      <Box height = 'auto' width = "100%" sx={{justifyContent: 'center', display: 'flex', flexDirection: 'column', marginLeft: '40px'}}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton />
      </Box>
      </Container>
    ) :
    (
      <Box sx = {{flexGrow: 1,width: '100%', height: 600,minWidth: 1200, background: 'white', marginLeft: '20px',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '10px'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
          {request.map((userRequest) => (
              <Grid key={userRequest.reqId} item xs={2}>
                  <FriendCard userRequest={userRequest}/>
              </Grid>
          ))}
        </Grid>
      </Box>
    )
  )
}

export default FriendFeeds;
