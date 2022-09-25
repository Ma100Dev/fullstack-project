import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import useMessages from '../hooks/useMessages';

const Messages = () => {
    const messages = useMessages();
    const propertyIds = [...new Set(messages.map(m => m.property.id))];
    const messagesPerProperty = propertyIds.map(p => {
        return messages.filter(m => m.property.id === p).sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    });
    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messagesPerProperty.map(conversation => (
                    <li key={conversation[0].id}>
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