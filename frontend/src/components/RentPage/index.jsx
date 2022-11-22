import React, { useEffect } from 'react';
import Rental from './Rental';
import useRentals from '../../hooks/useRentals';
import PageSelector from '../PageSelector';

const RentPage = () => {
    const rentals = useRentals();
    const [page, setPage] = React.useState(1);
    useEffect(() => {
        console.log('page changed, rentals:', rentals);
        rentals.fetchData(page).then((data) => {
            console.log('data:', data);
        });
    }, [page, rentals]);
    return (
        <>
            {rentals.docs?.map(rental => (
                <Rental rental={rental} key={rental.id} />
            ))}
            < PageSelector page={page} setPage={setPage} pageCount={rentals.totalPages} />
        </>
    );
};

export default RentPage;