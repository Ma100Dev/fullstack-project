import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const NotFound = () => ( // Return a simple 404 page with a link to the home page, using Material UI components.
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}
    >
        <Typography variant="h1" component="h1">
            404
        </Typography>
        <Typography variant="h4" component="h2">
            Page not found
        </Typography>
        <Typography variant="h6" component="h3">
            <Link to="/">Go to home page</Link>
        </Typography>
    </Box>
);

export default NotFound;
