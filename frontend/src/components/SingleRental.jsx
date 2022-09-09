import React from 'react';
import { useParams } from 'react-router-dom';

const SingleRental = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Single Rental</h1>
            <h2>{id}</h2>
        </div>
    );
};

export default SingleRental;
