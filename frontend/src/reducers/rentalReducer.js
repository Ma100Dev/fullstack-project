const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RENTALS':
            return action.rentals;
        case 'CLEAR_RENTALS':
            return initialState;
        default:
            return state;
    }
};

export const setRentals = (rentals) => {
    return {
        type: 'SET_RENTALS',
        rentals
    };
};

export const clearRentals = () => {
    return {
        type: 'CLEAR_RENTALS'
    };
};

export default reducer;
