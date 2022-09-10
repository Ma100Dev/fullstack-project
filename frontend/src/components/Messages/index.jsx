import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../utils/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';

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
    const properties = [...new Set(messages.map(m => m.property))];
    const messagesPerProperty = properties.map(p => {
        return messages.filter(m => m.property === p).sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    });
    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messagesPerProperty.map(conversation => (
                    <li key={conversation[0].property.id}>
                        {conversation[0].property.title} <br />
                        {conversation[0].sender.username} at {format(new Date(conversation[0].createdAt), "dd.MM.yyyy '('EEEE')' 'at' HH:mm")}: {conversation[0].content}
                    </li>
                )
                )}
            </ul>
        </div>
    );
};

export default Messages;