import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rental from '@rental/RentPage';
import LoadingIndicator from '@reusables/LoadingIndicator';
import axios from 'axios';
import { BACKEND_URL } from '@utils/config';
import NotFound from '@general/NotFound';
import { useDispatch } from 'react-redux';
import { addError } from '@reducers/errorReducer';

const SingleRental = () => {
    const { id } = useParams();
    const [rental, setRental] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/properties/${id}`).then(res => {
            setRental(res.data);
        }).catch(err => {
            if (err.response.status === 404) {
                setRental({ error: '404' });
            } else {
                dispatch(addError({ title: 'Error', msg: 'Something went wrong' }));
            }

        });
    }, [id, dispatch]);

    if (!rental) return <LoadingIndicator />;
    if (rental?.error === '404') return <NotFound />;
    return (
        <Rental rental={rental} fullView={true} />
    );
};

export default SingleRental;
