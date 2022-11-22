import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setRentals } from '../reducers/rentalReducer';
import { BACKEND_URL } from '../utils/config';

const useRentals = (limit = 10) => {
    const user = useSelector(state => state.user);
    const [rentalState, setRentalState] = useState([]);
    const [success, setSuccess] = useState(false);
    setRentals(useSelector(state => state.rentals));
    const dispatch = useDispatch();

    const fetchData = useCallback(async (page = 1) => {
        const headers = user ? {
            'Authorization': `Bearer ${user?.token}`
        } : {};
            const { data, status } = await axios.get(`${BACKEND_URL}/properties?page=${page}&limit=${limit}`, {
                headers
            });
            if (status === 200) {
                setSuccess(true);
            }
            dispatch(setRentals(data));
            setRentalState(data);
            return data;
    }, [user, dispatch, limit]);

useEffect(() => {
    if (rentalState.length === 0 && !success) {
        fetchData();
    }
    }, [dispatch, rentalState, setRentalState, user, success, fetchData]);
    return { ...rentalState, fetchData };
};

export default useRentals;