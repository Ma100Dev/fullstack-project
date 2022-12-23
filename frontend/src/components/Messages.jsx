import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import LoadingIndicator from './LoadingIndicator';
import useConversations from '../hooks/useConversations';
import Button from '@mui/material/Button';
import { useCallback } from 'react';
import _ from 'lodash';

const Messages = () => {
    const { conversations, refresh } = useConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    const throttledRefresh = useCallback(_.throttle(() => { refresh(); }, 1000), []);
    if (!conversations) return <LoadingIndicator />;
    conversations.forEach(conversation => {
        conversation.messages = conversation.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    });
    // Sort conversations by the date of the last message.
    // If there are no messages, set as last in the list.
    conversations.sort((a, b) => {
        if (a.messages.length === 0) return 1;
        if (b.messages.length === 0) return -1;
        return new Date(b.messages[0].createdAt) - new Date(a.messages[0].createdAt);
    });
    return ( // TODO: Make not ugly
        <div>
            <h1>Messages</h1>
            <ul>
                {conversations.map(conversation => (
                    <div key={conversation.id}>
                        <li style={{ marginBottom: 10 }}>
                            <Link to={`/messages/${conversation.id}`}>
                                {conversation.property.title} <br />
                                {conversation.messages[0] ?
                                    `Latest: ${conversation.messages[0].sender.username} at ${format(new Date(conversation.messages[0].createdAt), "dd.MM.yyyy '('EEEE')' 'at' HH:mm")} `
                                    : 'No messages yet'}
                                {conversation.content}
                            </Link>
                        </li>
                    </div>
                )
                )}
            </ul>
            <Button onClick={throttledRefresh}>Refresh</Button>
        </div>
    );
};

export default Messages;
