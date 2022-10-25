//TODO Add messages to Redux store
import { BACKEND_URL } from '../utils/config';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useUser from './useUser';

const useMessages = () => {
    const [conversations, setConversations] = useState([]);
    let localUser = useUser();
    const refresh = () => {
        axios.get(`${BACKEND_URL}/conversations`,
            {
                headers: {
                    'Authorization': `Bearer ${localUser.token}`
                }
            })
            .then(res => {
                setConversations(res.data);
            });
    };
    useEffect(() => {
        refresh();
        console.log('Conversations: ', conversations);
    }, []);
    return {
        ...(conversations.map((conversation) => ({
            ...conversation,
            messages:
                conversation.messages === undefined || conversation.messages === null ? null :
                    conversation.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }))),
        refresh
    };
};

export default useMessages;