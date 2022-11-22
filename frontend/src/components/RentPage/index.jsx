import React from 'react';
import Rental from './Rental';
import useRentals from '../../hooks/useRentals';
import PageSelector from '../PageSelector';

const RentPage = () => {
    const rentals = useRentals();
    return (
        <>
            {rentals.docs?.map(rental => (
                <Rental rental={rental} key={rental.id} />
            ))}
            < PageSelector rentals={rentals} pageCount={rentals.totalPages} />
        </>
    );
};

export default RentPage;