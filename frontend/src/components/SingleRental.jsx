import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rental from './RentPage/Rental';
import LoadingIndicator from './LoadingIndicator';
import axios from 'axios';
import { BACKEND_URL } from '../utils/config';
import NotFound from './NotFound';

const SingleRental = () => {
    const { id } = useParams();
    const [rental, setRental] = useState(null);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/properties/${id}`).then(res => {
            setRental(res.data);
        }).catch(err => {
            if (err.response.status === 404) setRental({ error: '404' });
        });
    }, [id]);

    if (!rental) return <LoadingIndicator />;
    if (rental?.error === '404') return <NotFound />;
    return (
        <Rental rental={rental} fullView={true} />
    );
};

export default SingleRental;
