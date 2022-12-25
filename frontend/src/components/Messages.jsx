import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import LoadingIndicator from './LoadingIndicator';
import useConversations from '../hooks/useConversations';
import {
    Button, Box, Typography,
    List, ListItem, Divider
} from '@mui/material';
import RentalImage from './RentPage/RentalImage';
import _ from 'lodash';

const Messages = () => {
    const { conversations, refresh } = useConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    const throttledRefresh = useCallback(_.throttle(() => { refresh(); }, 1000), []);
    if (!conversations) return <LoadingIndicator />;
    conversations.forEach(conversation => {
        conversation.messages = conversation.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    });
    // Sort conversations by latest message (latest first)
    // If no messages, sort by createdAt vs latest message
    conversations.sort((a, b) => {
        if (a.messages[0] && b.messages[0]) {
            return new Date(b.messages[0].createdAt) - new Date(a.messages[0].createdAt);
        } else if (a.messages[0] && !b.messages[0]) {
            return new Date(b.startedAt) - new Date(a.messages[0].createdAt);
        } else if (!a.messages[0] && b.messages[0]) {
            return new Date(b.messages[0].createdAt) - new Date(a.startedAt);
        } else {
            return new Date(b.startedAt) - new Date(a.startedAt);
        }
    });
    return (
        <Box>
            <Typography variant='h2'>Messages</Typography>
            <List>
                {conversations.map(conversation => (
                    < Box key={conversation.id} >
                        <ListItem style={{ marginBottom: 10 }}>
                            <Link style={{
                                textDecoration: 'none',
                                color: 'black',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }} to={`/messages/${conversation.id}`}>
                                <RentalImage rental={conversation.property} imageProps={{
                                    style: {
                                        outline: '1px solid #ccc',
                                        borderRadius: '5px',
                                        padding: '5px',
                                        marginRight: '2.5rem',
                                        maxWidth: '5rem',
                                        maxHeight: '4rem',
                                        width: '100%',
                                        height: '100%',
                                    }
                                }} />
                                {conversation.property.title} <br /> {/* TODO: Check if own property */}
                                {conversation.messages[0] ?
                                    `Latest: ${conversation.messages[0].sender.username} at ${format(new Date(conversation.messages[0].createdAt), "dd.MM.yyyy '('EEEE')' 'at' HH:mm")} `
                                    : `No messages yet. Created on ${format(new Date(conversation.startedAt), "dd.MM.yyyy '('EEEE')' 'at' HH:mm")}`}
                                {conversation.content}
                            </Link>
                        </ListItem>
                        <Divider />
                    </Box>
                )
                )}
            </List >
            <Button onClick={throttledRefresh}>Refresh</Button>
        </Box >
    );
};

export default Messages;
