const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ERRORS':
            return action.errors;
        case 'ADD_ERROR':
            return [...state, action.error];
        case 'REMOVE_ERROR':
            return state.filter(error => error.id !== action.id);
        case 'CLEAR_ERRORS':
            return initialState;
        default:
            return state;
    }
};

export const setErrors = (errors) => {
    return {
        type: 'SET_ERRORS',
        errors
    };
};

export const addError = (error) => {
    return {
        type: 'ADD_ERROR',
        error: {id: Date.now().toString(), ...error}
    };
};

export const removeError = (id) => {
    return {
        type: 'REMOVE_ERROR',
        id
    };
};


export const clearErrors = () => {
    return {
        type: 'CLEAR_ERRORS'
    };
};

export default reducer;
