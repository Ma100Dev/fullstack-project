import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../utils/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    //TODO add a useUser hook
    let localUser = useSelector(state => state.user);
    if (!localUser) {
        localUser = {};
    }
    useEffect(() => {
        if (Object.keys(localUser).length === 0) {
            navigate('/login');
        }
    }, [localUser, navigate]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/messages`,
            {
                headers: {
                    'Authorization': `Bearer ${localUser.token}`
                }
            })
            .then(res => {
                setMessages(res.data);
            });
    }, []);

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>{message.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Messages;