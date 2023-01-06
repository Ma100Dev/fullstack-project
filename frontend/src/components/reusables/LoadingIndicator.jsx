import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIndicator = () => (
    <Box sx={{
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center',
        'height': '100vh'
    }} data-testid="loading">
        <CircularProgress />
    </Box>
);

export default LoadingIndicator;
