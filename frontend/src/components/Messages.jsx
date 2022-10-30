import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import LoadingIndicator from './LoadingIndicator';
import useConversations from '../hooks/useConversations';

const Messages = () => {
    const { conversations } = useConversations();
    if (!conversations) return <LoadingIndicator />;
    console.log(conversations);
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
        </div>
    );
};

export default Messages;