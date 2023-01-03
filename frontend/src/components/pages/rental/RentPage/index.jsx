import { useState } from 'react';
import Rental from './Rental';
import useRentals from '@hooks/useRentals';
import PageSelector from '@reusables/PageSelector';
import { Typography, Box } from '@mui/material';
import ScrollToTop from '@reusables/ScrollToTop';

const RentPage = () => {
    const rentals = useRentals();
    const [page, setPage] = useState(1);

    const onChange = async (page) => {
        setPage(page);
        const data = await rentals.fetchData(page);
        rentals.setRentalState(data);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

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
            <PageSelector rentals={rentals} pageCount={rentals.totalPages} onChange={onChange} />
            <ScrollToTop />
        </>
    );
};

export default RentPage;
