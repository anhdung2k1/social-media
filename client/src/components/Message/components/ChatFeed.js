
import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Avatar, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createMessage, getMessageRoom } from '../../../actions/chat';
import MessageCard from './MessageCard';
import HeaderChat from "./HeaderChat";

const ChatFeed = ({ userProfile }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, messages, error } = useSelector(state => state.messages);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        dispatch(getMessageRoom(id)); // Fetch messages when the component mounts or the room ID changes
    }, [id, dispatch]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message.trim()) {
            dispatch(createMessage(userProfile.user_id, id, { message }));
            setMessage('');
        }
    };

    return (
        <Box flex={4} p={1} sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', backgroundColor:"#FFFFFF"}}>
            
            <HeaderChat />

            {/*Noi show chat*/}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '100vh', padding: '10px' }}>
                {isLoading ? <CircularProgress /> : messages.map(msg => (
                    <MessageCard key={msg.id} message={msg} user={userProfile} />
                ))}
                <div ref={messagesEndRef} />
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', boxShadow: 3, height: 'auto', padding: "20px 0", borderTop: '1px solid #ccc', backgroundColor: 'background.paper' }}>
                <Avatar src={userProfile?.avatar_url} sx={{ m: 1 }} />
                <TextField
                    name="message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    multiline
                    fullWidth
                    sx={{ ml: 1, flex: 1 }}
                />
                <Button type="submit" sx={{ m: 1 }}>Send</Button>
            </Box>
        </Box>
    );

};

export default ChatFeed;
