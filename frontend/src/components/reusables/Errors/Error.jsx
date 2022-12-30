import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { useDispatch } from 'react-redux';
import { removeError } from '@reducers/errorReducer';

import PropTypes from 'prop-types';

const Error = ({ error, time }) => {
    const dispatch = useDispatch();
    time && setTimeout(() => {
        dispatch(removeError(error.id));
    }, time);
    return (
        <Alert key={error.id} severity="error" variant='outlined' sx={{
            width: '90%',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {error.title && <AlertTitle>{error.title}</AlertTitle>}
            {error.msg}
        </Alert>
    );
};

Error.propTypes = {
    time: PropTypes.number,
    error: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        msg: PropTypes.string.isRequired,
    }).isRequired,
};

export default Error;
