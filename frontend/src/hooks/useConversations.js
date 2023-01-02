import { BACKEND_URL } from '@utils/config';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import useUser from './useUser';
import { useSelector, useDispatch } from 'react-redux';
import { setConversations } from '@reducers/conversationReducer';
import { addError } from '@reducers/errorReducer';

const useConversations = () => {
    const dispatch = useDispatch();
    let storedConversations = useSelector(state => state.conversations);
    const [conversations, setLocalConversations] = useState([]);
    let localUser = useUser();
    const refresh = useCallback(async () => {
        const { data } = await axios.get(`${BACKEND_URL}/conversations`,
            {
                headers: {
                    'Authorization': `Bearer ${localUser.token}`
                }
            }).catch((error) => {
                dispatch(addError({ msg: error.response?.data?.error || error.response?.statusText, title: 'Error connecting to server' }));
            });
        setLocalConversations(data);
        dispatch(setConversations(data));
    }, [localUser.token, dispatch]);
    useEffect(() => {
        if (storedConversations.length === 0) {
            refresh();
        } else {
            setLocalConversations(storedConversations);
        }
    }, [refresh, storedConversations]);
    return {
        conversations: (
            conversations.map((conversation) => ({
                ...conversation,
                messages:
                    conversation.messages === undefined || conversation.messages === null ? null :
                        conversation.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }))
        ),
        refresh
    };
};

export default useConversations;
