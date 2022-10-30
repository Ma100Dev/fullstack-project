import React from 'react';
import Rental from './Rental';
import useRentals from '../../hooks/useRentals';

const RentPage = () => {
    const rentals = useRentals();  // TODO: Fix for when account is deleted
    return (
        <>
            {rentals.map(rental => (
                <Rental rental={rental} key={rental.id} />
            ))}
        </>
    );
};

export default RentPage;