import React from 'react';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Link } from 'react-router-dom';

const MenuItem = () => (
    <Typography variant="h6" color="inherit" sx={{ flexGrow: 1, mt: 1, ml: 2, mb: 1, mr: 1 }}>
        <Link to="/">
            Home
        </Link>
    </Typography>
);

export default MenuItem;