import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setRentals } from '../reducers/rentalReducer';
import { BACKEND_URL } from '../utils/config';

const useRentals = () => {
    const user = useSelector(state => state.user);
    const [rentalState, setRentalState] = useState([]);
    setRentals(useSelector(state => state.rentals));
    const dispatch = useDispatch();
    useEffect(() => {
        const headers = user ? {
            'Authorization': `Bearer ${user?.token}`
        } : {};
        const fetchData = async () => {
            if (rentalState.length === 0) {
                const { data } = await axios.get(`${BACKEND_URL}/properties`, {
                    headers
                });
                dispatch(setRentals(data));
                setRentalState(data);
            }
        };
        fetchData();
    }, [dispatch, rentalState, setRentalState, user]);
    return rentalState;
};

export default useRentals;