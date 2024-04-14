import React from 'react';
import ListFriends from '../components/ListFriends';
import {useSelector} from 'react-redux';
import { Box,Grid, Container, Skeleton } from '@mui/material';
const ListFriendFeeds = ({user}) => {
  const {isLoading,requests} = useSelector((state) => state.requests);
  if(isLoading && !requests) return 'No friends found';
  const listFriends = requests.filter(item => (item.receiveUser.user_id === user.user_id || item.sendUser.user_id === user.user_id)) 
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
      ) :(
    <Box flex = {3} p={1} sx = {{width: '100%',minWidth: 1200, height: 'auto', background: 'white', marginLeft: '20px',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '10px'}}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
          {listFriends.map((userRequest) => (
            <Grid key={userRequest.reqId} item xs={6}>
              <ListFriends user = {user} userRequest={userRequest}/>
          </Grid>
          ))}
          </Grid>
      </Box>
    )
  )
}

export default ListFriendFeeds
