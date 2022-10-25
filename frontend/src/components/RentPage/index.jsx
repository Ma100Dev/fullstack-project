import React from 'react';
import Rental from './Rental';
import useRentals from '../../hooks/useRentals';

const RentPage = () => {
    const rentals = useRentals();
    const finalRentals = rentals.map(rental => ({ ...rental, owner: { name: '[Deleted user]', username: '[Deleted user]' } })); //TODO: remove this line when backend is fixed
    return (
        <>
            {finalRentals.map(rental => (
                <Rental rental={rental} key={rental.id} />
            ))}
        </>
    );
};

export default RentPage;