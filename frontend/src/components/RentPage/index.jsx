import { useState } from 'react';
import Rental from './Rental';
import useRentals from '../../hooks/useRentals';
import PageSelector from '../PageSelector';
import { Typography, Box } from '@mui/material';
import ScrollToTop from '../ScrollToTop';

const RentPage = () => {
    const rentals = useRentals();
    const [page, setPage] = useState(1);
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '1rem',
            }}>
                <Typography variant="h2" >Rentals</Typography>
                <Typography variant="body1" color="gray" sx={{
                    alignSelf: 'flex-end',
                    mb: '1rem',
                    ml: '1rem',
                }}>Page {page}</Typography>
            </Box>
            {rentals.docs?.map(rental => (
                <Rental rental={rental} key={rental.id} />
            ))}
            <PageSelector rentals={rentals} pageCount={rentals.totalPages} onChange={setPage} />
            <ScrollToTop />
        </>
    );
};

export default RentPage;
