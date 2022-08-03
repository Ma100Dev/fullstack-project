const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SET_USER':
        return action.user;
    case 'CLEAR_USER':
        return initialState;
    default:
        return state;
    }
};

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    };
};

export const clearUser = () => {
    return {
        type: 'CLEAR_USER'
    };
};

export default reducer;