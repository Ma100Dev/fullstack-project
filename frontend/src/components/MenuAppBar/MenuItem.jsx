import React from 'react';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Link } from 'react-router-dom';

const typographyProps = {
    variant: "h6",
    color: "inherit",
    sx: { flexGrow: 1, mt: 1, ml: 2, mb: 1, mr: 1 }
};

const MenuItem = ({ text, link, isButton = false, onClick }) => (
    <>
        {
            isButton ?
                <ButtonBase onClick={onClick}>
                    <Typography {...typographyProps}>{text}</Typography>
                </ButtonBase> :
                <Link to={link}>
                    <Typography {...typographyProps}>{text}</Typography>
                </Link>
        }
    </>
);

export default MenuItem;