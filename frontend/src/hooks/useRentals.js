import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setRentals } from '@reducers/rentalReducer';
import { BACKEND_URL } from '@utils/config';


// TODO: Add redux store for rentals again if it makes sense

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
            return data;
    }, [user, limit]);

useEffect(() => {
    if (rentalState.length === 0 && !success) {
        fetchData().then(data => {
            setRentalState(data);
        });
    }
    }, [dispatch, rentalState, setRentalState, user, success, fetchData]);
    return { ...rentalState, setRentalState, fetchData };
};

export default useRentals;
