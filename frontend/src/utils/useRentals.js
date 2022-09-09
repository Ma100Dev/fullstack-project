import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setRentals } from '../reducers/rentalReducer';

const useRentals = () => {
    const rentals = useSelector(state => state.rentals);
    const dispatch = useDispatch();
    React.useEffect(() => {
        const fetchData = async () => {
            if (rentals.length === 0) {
                const { data } = await axios.get('/api/properties');
                dispatch(setRentals(data));
            }
        };
        fetchData();
    }, [dispatch, rentals]);
    return rentals;
};

export default useRentals;