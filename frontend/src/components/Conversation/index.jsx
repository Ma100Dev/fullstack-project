import React from 'react';
import { useParams } from 'react-router-dom';

const Conversation = () => {
    const { id } = useParams();
    const messages = id;
    return <>
        <p>{messages}</p>
    </>;
};

export default Conversation;
