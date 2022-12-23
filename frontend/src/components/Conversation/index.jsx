import { Box, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import useConversations from '../../hooks/useConversations';
import Message from './Message';
import LoadingIndicator from '../LoadingIndicator';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/config';
import useUser from '../../hooks/useUser';
import { useLocation } from 'react-router-dom';
import NotFound from '../NotFound';

const Conversation = () => {
    const { id } = useParams();
    // Should only fetch the conversation with the given id, not all of them
    // This is not happening right now, but it should
    const { conversations, refresh } = useConversations();
    const [message, setMessage] = useState('');
    const user = useUser();
    const location = useLocation();

    const [newRefreshed, setNewRefreshed] = useState(false);
    const isNew = new URLSearchParams(location.search).get('new') === 'true';

    if (isNew && !newRefreshed) {
        refresh();
        setNewRefreshed(true);
    }

    if (conversations.length === 0) return <LoadingIndicator />;
    const conversation = conversations.find(c => c.id === id);
    if (!conversation) return <NotFound />;
    conversations.forEach(conversation => {
        conversation.messages = conversation.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <Box>
                <Typography variant="h4" component="h1">
                    {conversation.property.title}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: 'auto' }}>
                {conversation.messages.map(m => (
                    <Message message={m} key={m.id} />
                ))}
            </Box>

            <Box sx={{ flexDirection: 'row', position: 'fixed', bottom: '1rem', left: '1rem', right: 0, width: '103%' }}>
                <TextField sx={{ width: '85%', alignSelf: 'flex-start' }} value={message} onChange={(event) => {
                    let content = event.target.value.trim();
                    if (content.length > 0) {
                        setMessage(content);
                    }
                }} />
                <Button sx={{ width: '10%', height: '100%', ml: 1, mr: '1rem' }} variant="contained" onClick={
                    async () => {
                        if (message.length > 0) {
                            await axios.post(`${BACKEND_URL}/messages`, {
                                content: message,
                                conversation: id
                            }, {
                                headers: {
                                    Authorization: `Bearer ${user.token}`
                                }
                            });
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
