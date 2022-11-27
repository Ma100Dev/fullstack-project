import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rental from './RentPage/Rental';
import LoadingIndicator from './LoadingIndicator';
import axios from 'axios';
import { BACKEND_URL } from '../utils/config';

const SingleRental = () => {
    const { id } = useParams();
    const [rental, setRental] = useState(null);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/properties/${id}`).then(res => {
            setRental(res.data);
        });
    }, [id]);

    if (!rental) return <LoadingIndicator />;
    return (
        <Rental rental={rental} fullView={true} />
    );
};

export default SingleRental;
