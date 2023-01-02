import PropTypes from 'prop-types';
import Error from '@reusables/Errors/Error';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <>
            <Error error={{ id: 'error', title: 'Something went wrong.', msg: error.message }} time={0} />
            <Box sx={{
                width: '100%',
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}   >
                <Button variant="contained" onClick={resetErrorBoundary}>Try again</Button>
            </Box>
        </>
    );
};

ErrorFallback.propTypes = {
    error: PropTypes.object.isRequired,
    resetErrorBoundary: PropTypes.func.isRequired,
};

export default ErrorFallback;
