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
    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {conversations.map(conversation => (
                    <li key={conversation.id}>
                        <Link to={`/messages/${conversation.id}`}>
                            {conversation.property.title} <br />
                            {conversation.messages[0] && `${conversation.messages[0].sender.username} at ${format(new Date(conversation.messages[0].createdAt), "dd.MM.yyyy '('EEEE')' 'at' HH:mm")} `}
                            {conversation.content}
                        </Link>
                    </li>
                )
                )}
            </ul>
            <Button onClick={throttledRefresh}>Refresh</Button>
        </div>
    );
};

export default Messages;