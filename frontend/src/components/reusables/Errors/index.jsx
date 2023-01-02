import { useSelector } from 'react-redux';
import Error from './Error';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const Errors = () => {
    const errors = useSelector((state) => state.errors);
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Stack spacing={1} sx={{ width: '100%' }}>
                {errors?.map((error) => (
                    <Error key={error.id} error={error} time={10_000} />
                ))}
            </Stack>
        </Box>
    );
};

export default Errors;
