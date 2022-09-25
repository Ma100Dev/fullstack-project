import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import useMessages from '../../hooks/useMessages';
import Message from './Message';

const Conversation = () => {
    const { id } = useParams();
    const messages = useMessages();
    const conversation = messages.filter(m => m.property.id === id).sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
    });
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', margin: 'auto' }}>
                {conversation.map(m => (
                    <Message message={m} key={m.id} />
                ))}
            </Box>
        </>
    );
};

export default Conversation;
