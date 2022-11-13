import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setRentals } from '../reducers/rentalReducer';
import { BACKEND_URL } from '../utils/config';

const useRentals = () => {
    const user = useSelector(state => state.user);
    const [rentalState, setRentalState] = useState([]);
    const [success, setSuccess] = useState(false);
    setRentals(useSelector(state => state.rentals));
    const dispatch = useDispatch();
    useEffect(() => {
        const headers = user ? {
            'Authorization': `Bearer ${user?.token}`
        } : {};
        const fetchData = async () => {
            if (rentalState.length === 0 && !success) {
                const { data, status } = await axios.get(`${BACKEND_URL}/properties`, {
                    headers
                });
                if (status === 200) {
                    setSuccess(true);
                }
                dispatch(setRentals(data));
                setRentalState(data);
            }
        };
        fetchData();
    }, [dispatch, rentalState, setRentalState, user, success]);
    return rentalState;
};

export default useRentals;