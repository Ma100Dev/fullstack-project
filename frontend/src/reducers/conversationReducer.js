const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CONVERSATIONS':
            return action.conversations;
        case 'CLEAR_CONVERSATIONS':
            return initialState;
        default:
            return state;
    }
};

export const setConversations = (conversations) => {
    return {
        type: 'SET_CONVERSATIONS',
        conversations
    };
};

export const clearRentals = () => {
    return {
        type: 'CLEAR_CONVERSATIONS'
    };
};

export default reducer;