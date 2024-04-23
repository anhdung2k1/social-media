// import React,{useState} from 'react';
// import {Box,TextField,ButtonBase,Avatar,Container,Skeleton} from '@mui/material';
// import HeaderChat from './HeaderChat';
// import MessageCard from './MessageCard';
// import {useSelector,useDispatch} from 'react-redux';
// import {createMessage} from '../../../actions/chat';
// import {useParams,useNavigate} from 'react-router-dom';

// const ChatFeed = ({userProfile}) => {
//     const {id} = useParams(); // Room Id
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const {isLoading, messages} = useSelector((state) => state.messages);
//     const [message,setMessage] = useState('');
//     const [formMessage, setFormMessage] = useState({message: ''});
//     const handleSubmit = (e) => {
//       if(e.keyCode === 13 || e.key === 'Enter'){
//         dispatch(createMessage(userProfile?.user_id,Number(id),formMessage));
//         setMessage('');
//         navigate(`/message/${id}`);
//       }
//     }
//     const handleChange = (e) => {
//       setMessage(e.target.value);
//       setFormMessage({...formMessage,[e.target.name]: e.target.value});
//     }
//     if(!messages){return "No messages";}
//     console.log(messages);
//   return (
//     isLoading ?
//     <Container >
//         <Box height = 'auto' width = "100%" sx={{justifyContent: 'center', display: 'flex', flexDirection: 'column', marginLeft: '40px'}}>
//             <Skeleton />
//             <Skeleton animation="wave" />
//             <Skeleton animation={false} />
//             <Skeleton />
//             <Skeleton animation="wave" />
//             <Skeleton animation={false} />
//             <Skeleton />
//         </Box>
//     </Container>
//     :
//     <Box flex = {4} p={1} sx = {{width: '100%', height: 'auto'}}>
//         <HeaderChat />
//         <Box sx = {{display: 'flex', flexDirection: 'column',marginTop: 5, height: '800px',overflow: 'scroll', whiteSpace: 'nowrap'}}>
//           {messages.map((mess) => (
//             <MessageCard key = {mess.id} message = {mess} />
//           ))}
//         </Box>
//         <Box display = 'flex' flexDirection = 'row' sx = {{width: '100%', background: 'white',borderRadius: '30px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
//           <ButtonBase onClick = {() => null} sx = {{marginLeft: 2}}>
//             <Avatar alt = "avatar" src = {userProfile?.avatar_url}/>
//           </ButtonBase>
//         <TextField name = "message" variant = "filled" value = {message} onKeyPress={handleSubmit} onChange={handleChange} multiline label = "Aa" fullWidth InputProps = {{ disableUnderline: true}} sx = {{marginLeft: 2,marginRight: 3}}/>
//       </Box>
//       </Box>
//   )
// }

// export default ChatFeed
// import React, { useState } from 'react';
// import { Box, TextField, ButtonBase, Avatar, Container, Skeleton } from '@mui/material';
// import HeaderChat from './HeaderChat';
// import MessageCard from './MessageCard';
// import { useSelector, useDispatch } from 'react-redux';
// import { createMessage } from '../../../actions/chat';
// import { useParams, useNavigate } from 'react-router-dom';

// const ChatFeed = ({ userProfile }) => {
//   const { id } = useParams(); // Room Id
//   const roomId = parseInt(id); // Convert id to a number
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isLoading, messages } = useSelector((state) => state.messages);
//   const [message, setMessage] = useState('');
//   const [formMessage, setFormMessage] = useState({ message: '' });

//   const handleSubmit = (e) => {
//     if (e.keyCode === 13 || e.key === 'Enter') {
//       e.preventDefault(); // Prevent form submission
//       dispatch(createMessage(userProfile?.user_id, roomId, formMessage)); // Use roomId instead of Number(id)
//       setMessage('');
//       navigate(`/message/${id}`); // Use roomId instead of id
//     }
//   };

//   const handleChange = (e) => {
//     setMessage(e.target.value);
//     setFormMessage({ ...formMessage, [e.target.name]: e.target.value });
//   };

//   if (!messages) {
//     return "No messages";
//   }

//   console.log(messages);

//   return (
//     isLoading ?
//       <Container >
//         <Box height='auto' width="100%" sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', marginLeft: '40px' }}>
//           <Skeleton />
//           <Skeleton animation="wave" />
//           <Skeleton animation={false} />
//           <Skeleton />
//           <Skeleton animation="wave" />
//           <Skeleton animation={false} />
//           <Skeleton />
//         </Box>
//       </Container>
//       :
//       <Box flex={4} p={1} sx={{ width: '100%', height: 'auto' }}>
//         <HeaderChat />
//         <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 5, height: '800px', overflow: 'scroll', whiteSpace: 'nowrap' }}>
//           {messages.map((mess) => (
//             <MessageCard key={mess.id} message={mess} />
//           ))}
//         </Box>
//         <Box display='flex' flexDirection='row' sx={{ width: '100%', background: 'white', borderRadius: '30px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
//           <ButtonBase onClick={() => null} sx={{ marginLeft: 2 }}>
//             <Avatar alt="avatar" src={userProfile?.avatar_url} />
//           </ButtonBase>
//           <TextField
//             name="message"
//             variant="filled"
//             value={message}
//             onKeyPress={handleSubmit}
//             onChange={handleChange}
//             multiline
//             label="Aa"
//             fullWidth
//             InputProps={{ disableUnderline: true }}
//             sx={{ marginLeft: 2, marginRight: 3 }}
//           />
//         </Box>
//       </Box>
//   );
// };

// export default ChatFeed;
import React, { useState, useEffect } from 'react';
import { Box, TextField, ButtonBase, Avatar, Container, Skeleton } from '@mui/material';
import HeaderChat from './HeaderChat';
import MessageCard from './MessageCard';
import { useSelector, useDispatch } from 'react-redux';
import { createMessage } from '../../../actions/chat';
import { useParams, useNavigate } from 'react-router-dom';

const ChatFeed = ({ userProfile }) => {
    const { id } = useParams(); // Room Id
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, messages } = useSelector((state) => state.messages);
    const [message, setMessage] = useState('');
    const [formMessage, setFormMessage] = useState({ message: '' });

    // useEffect to ensure roomId is set before making the API call
    useEffect(() => {
        if (id) {
            // If roomId is valid, fetch messages for the room
            // You might want to dispatch an action to fetch messages here
            console.log('RoomId:', id);
        }
    }, [id]);

    const handleSubmit = (e) => {
        if (e.keyCode === 13 || e.key === 'Enter') {
            dispatch(createMessage(userProfile?.user_id, Number(id), formMessage));
            setMessage('');
            navigate(`/message/${id}`);
        }
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
        setFormMessage({ ...formMessage, [e.target.name]: e.target.value });
    }

    return (
        isLoading ?
            <Container>
                <Box height='auto' width="100%" sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', marginLeft: '40px' }}>
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
            <Box flex={4} p={1} sx={{ width: '100%', height: 'auto' }}>
                <HeaderChat />
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 5, height: '800px', overflow: 'scroll', whiteSpace: 'nowrap' }}>
                    {messages.map((mess) => (
                        <MessageCard key={mess.id} message={mess} />
                    ))}
                </Box>
                <Box display='flex' flexDirection='row' sx={{ width: '100%', background: 'white', borderRadius: '30px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                    <ButtonBase onClick={() => null} sx={{ marginLeft: 2 }}>
                        <Avatar alt="avatar" src={userProfile?.avatar_url} />
                    </ButtonBase>
                    <TextField
                        name="message"
                        variant="filled"
                        value={message}
                        onKeyPress={handleSubmit}
                        onChange={handleChange}
                        multiline
                        label="Aa"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        sx={{ marginLeft: 2, marginRight: 3 }}
                    />
                </Box>
            </Box>
    );
}

export default ChatFeed;
