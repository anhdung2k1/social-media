import React,{useEffect} from 'react';
import {Box,Container,Skeleton} from '@mui/material';
import NotificationCard from './NotificationCard';
import {useSelector} from 'react-redux';

const NotificationFeed = ({user}) => {
  const {isLoading,notifications} = useSelector((state) => state.notifications);
  useEffect(() => {
    console.log(isLoading, notifications);
  })
  if(!notifications) {return "No notifications found";}
  return (
    isLoading ? 
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
    :
    <>
     { (!isLoading && notifications) &&
      <Box width = "800px" backgroundColor = "white" borderRadius = "5px">
        {notifications.map((notification) => (
            <NotificationCard key = {notification.notificationId} notification = {notification} user = {user}/>
        ))}
      </Box>
    }
    </>
  )
}

export default NotificationFeed
