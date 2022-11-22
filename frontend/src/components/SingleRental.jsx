import React from 'react';
import { useParams } from 'react-router-dom';
import useRentals from '../hooks/useRentals';
import Rental from './RentPage/Rental';
import LoadingIndicator from './LoadingIndicator';

const SingleRental = () => {
    const { id } = useParams();
    const rentals = useRentals()?.docs;
    if (!rentals) return <LoadingIndicator />;
    const rental = rentals.find((r) => r.id === id);
    return (
        <Rental rental={rental} fullView={true} />
    );
};

export default SingleRental;
