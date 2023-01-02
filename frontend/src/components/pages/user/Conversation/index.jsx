import { useEffect } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import useConversations from '@hooks/useConversations';
import Message from './Message';
import LoadingIndicator from '@reusables/LoadingIndicator';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@utils/config';
import useUser from '@hooks/useUser';
import { useLocation } from 'react-router-dom';
import NotFound from '@general/NotFound';
import { useDispatch } from 'react-redux';
import { addError } from '@reducers/errorReducer';

const sendMessage = async ({ message, id, user, setMessage, refresh }) => {
    const msg = message.trim();
    if (msg.length > 0) {
        await axios.post(`${BACKEND_URL}/messages`, {
            content: msg,
            conversation: id
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }).catch(err => {
            return addError({ title: 'Error', msg: err.response?.data?.error || 'Something went wrong' });
        });
        setMessage('');
        refresh();
        return true;
    }
};

const Conversation = () => {
    const { id } = useParams();
    // Should only fetch the conversation with the given id, not all of them
    // This is not happening right now, but it should
    const { conversations, refresh } = useConversations();
    const [message, setMessage] = useState('');
    const user = useUser();
    const location = useLocation();
    const dispatch = useDispatch();

    const [newRefreshed, setNewRefreshed] = useState(false);
    const isNew = new URLSearchParams(location.search).get('new') === 'true';

    useEffect(() => {
        const keydownHandler = (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation();
                const status = sendMessage({ message, id, user, setMessage, refresh, dispatch });
                if (status !== true) dispatch(status);
            }
        };
        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        };
    }, [id, message, refresh, user, dispatch]);

    if (isNew && !newRefreshed) {
        refresh();
        setNewRefreshed(true);
    }

    if (conversations.length === 0) return <LoadingIndicator />;
    const conversation = conversations.find(c => c.id === id);
    if (!conversation) return <NotFound />;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <Box>
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    {conversation.property.title}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: 'auto', mb: '5rem' }}>
                {conversation.messages.map(m => (
                    <Message message={m} key={m.id} />
                ))}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'fixed', bottom: '1rem', left: '1rem', right: 0, width: '103%', backgroundColor: 'white' }}>
                <TextField sx={{ width: '85%', alignSelf: 'flex-start' }} value={message} multiline
                    placeholder='Type your message here... Press Ctrl+Enter or the send button to send'
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }} />
                <Button sx={{ ml: 1, mr: '5%', flex: 'auto' }} variant="contained" onClick={() => sendMessage({ message, id, user, setMessage, refresh })}><SendIcon /></Button>
            </Box>
        </Box >
    );
};

export default Conversation;
