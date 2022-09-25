import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from './utils/config';
import { Link } from 'react-router-dom';
import useUser from './hooks/useUser';
import format from 'date-fns/format';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    //TODO add a useUser hook
    let localUser = useUser();

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
                        <Link to={`/messages/${conversation[0].property.id}`}>
                            {conversation[0].property.title} <br />
                            {conversation[0].sender.username} at {format(new Date(conversation[0].createdAt), "dd.MM.yyyy '('EEEE')' 'at' HH:mm")}:&nbsp;
                            {conversation[0].content}
                        </Link>
                    </li>
                )
                )}
            </ul>
        </div>
    );
};

export default Messages;