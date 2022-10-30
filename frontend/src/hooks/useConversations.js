// TODO Add messages to Redux store
import { BACKEND_URL } from '../utils/config';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import useUser from './useUser';

const useConversations = () => {
    const [conversations, setConversations] = useState([]);
    let localUser = useUser();
    const refresh = useCallback(async () => {
        const { data } = await axios.get(`${BACKEND_URL}/conversations`,
            {
                headers: {
                    'Authorization': `Bearer ${localUser.token}`
                }
            });
        setConversations(data);
    }, [localUser.token]);
    useEffect(() => {
        refresh();
    }, [refresh]);
    return {
        conversations: (
            conversations.map((conversation) => ({
                ...conversation,
                messages:
                    conversation.messages === undefined || conversation.messages === null ? null :
                        conversation.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }))
        ),
        refresh
    };
};

export default useConversations;