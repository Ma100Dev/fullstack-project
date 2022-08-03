import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setRentals } from "../../reducers/rentalReducer";

const RentPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const rentals = useSelector(state => state.rentals);
    React.useEffect(async () => {
        if (rentals.length === 0) {
            const { data } = await axios.get("/api/properties");
            dispatch(setRentals(data));
        }
    }, [dispatch, rentals]);
    return (
        <>
            <h1>RentPage</h1>
        </>
    );
};

export default RentPage;