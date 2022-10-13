//TODO Add messages to Redux store
import { BACKEND_URL } from '../utils/config';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useUser from './useUser';

const useMessages = () => {
    const [messages, setMessages] = useState([]);
    let localUser = useUser();
    const refresh = () => {
        axios.get(`${BACKEND_URL}/messages`,
            {
                headers: {
                    'Authorization': `Bearer ${localUser.token}`
                }
            })
            .then(res => {
                setMessages(res.data);
            });
    };
    useEffect(() => {
        refresh();
    }, []);
    return { messages: messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), refresh };
};

export default useMessages;