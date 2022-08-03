import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setRentals } from "../../reducers/rentalReducer";
import Rental from "./Rental";

const RentPage = () => {
    const dispatch = useDispatch();
    //const user = useSelector(state => state.user);
    const rentals = useSelector(state => state.rentals);
    React.useEffect(() => {
        const fetchData = async () => {
            if (rentals.length === 0) {
                const { data } = await axios.get("/api/properties");
                dispatch(setRentals(data));
            }
        };
        fetchData();
    }, [dispatch, rentals]);
    return (
        <>
            {rentals.map(rental => (
                <Rental rental={rental} key={rental.id} />
            ))}
        </>
    );
};

export default RentPage;