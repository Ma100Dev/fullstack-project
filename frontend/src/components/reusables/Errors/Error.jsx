import { useRef, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { useDispatch } from 'react-redux';
import { removeError } from '@reducers/errorReducer';

import PropTypes from 'prop-types';

const Error = ({ error, time }) => {
    const dispatch = useDispatch();
    const errorRef = useRef(null);
    time && setTimeout(() => {
        dispatch(removeError(error.id));
    }, time);
    useEffect(() => {
        errorRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, [errorRef]);

    // This is a warning because it's not a fatal error, but it's not ideal
    // eslint-disable-next-line no-console
    if (!error?.id) console.warn('Error component received an error without an id. This is not recommended.');

    return (
        <Alert ref={errorRef} key={error?.id || Math.random()} severity="error" variant='outlined' data-testid="error" sx={{
            width: '90%',
            mr: 'auto',
            ml: 'auto',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {error?.title && <AlertTitle>{error.title}</AlertTitle>}
            {error?.msg || 'An error occurred'}
        </Alert>
    );
};

Error.propTypes = {
    time: PropTypes.number,
    error: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        msg: PropTypes.string,
    }),
};

export default Error;
