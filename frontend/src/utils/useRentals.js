import {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setRentals } from '../reducers/rentalReducer';
import { BACKEND_URL } from './config';

const useRentals = () => {
    const [rentalState, setRentalState] = useState([]);
    setRentals (useSelector(state => state.rentals));
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            if (rentalState.length === 0) {
                const { data } = await axios.get(`${BACKEND_URL}/properties`);
                dispatch(setRentals(data));
                setRentalState(data);
            }
        };
        fetchData();
    }, [dispatch, rentalState, setRentalState]);
    return rentalState;
};

export default useRentals;