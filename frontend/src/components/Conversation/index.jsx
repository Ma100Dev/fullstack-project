import { Box, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import useMessages from '../../hooks/useMessages';
import Message from './Message';
import LoadingIndicator from '../LoadingIndicator';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

const Conversation = () => {
    const { id } = useParams();
    const { messages, refresh } = useMessages();
    const conversation = messages.filter(m => m.property.id === id).sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
    });
    const [message, setMessage] = useState('');

    if (conversation.length === 0) {
        return (
            <LoadingIndicator />
        );
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <Box>
                <Typography variant="h4" component="h1">
                    {conversation[0].property.title}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: 'auto' }}>
                {conversation.map(m => (
                    <Message message={m} key={m.id} />
                ))}
            </Box>
            <Box sx={{ flexDirection: 'row' }}>
                <TextField sx={{ width: '85%', alignSelf: 'flex-start' }} value={message} onChange={(event) => {
                    let content = event.target.value.trim();
                    if (content.length > 0) {
                        setMessage(content);
                    }
                }} />
                <Button sx={{ width: '10%', height: '100%', ml: 1 }} variant="contained" onClick={
                    async () => {
                        if (message.length > 0) {
                            console.log(message);
                            setMessage('');
                            refresh();
                        }
                    }
                }><SendIcon /></Button>
            </Box>
        </Box>
    );
};

export default Conversation;
