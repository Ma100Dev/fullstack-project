import React from 'react';
import { useParams } from 'react-router-dom';
import useRentals from '../utils/useRentals';
import Rental from './RentPage/Rental';

const SingleRental = () => {
    const { id } = useParams();
    const rentals = useRentals();
    const rental = rentals.find((r) => r.id === id);
    return (
        <Rental rental={rental} />
    );
};

export default SingleRental;
