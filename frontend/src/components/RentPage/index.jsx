import React from 'react';
import Rental from './Rental';
import useRentals from '../../hooks/useRentals';
import PageSelector from '../PageSelector';

const RentPage = () => {
    const rentals = useRentals();
    const [page, setPage] = React.useState(1);
    return (
        <>
            {rentals.map(rental => (
                <Rental rental={rental} key={rental.id} />
            ))}
            < PageSelector page={page} setPage={setPage} pageCount={5 /* TO BE REPLACED */} />
        </>
    );
};

export default RentPage;