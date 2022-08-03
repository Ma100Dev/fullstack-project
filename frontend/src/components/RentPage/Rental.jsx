import React from "react";
import PetsIcon from '@mui/icons-material/Pets';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Rental = ({ rental }) => {
    return (
        <Box
            sx={{
                outline: "1px solid #ccc",
                p: 3,
            }}
        >
            <Typography>title</Typography>
            <Typography>{rental.description}</Typography>
            <Typography>{rental.price}</Typography>
            <Typography>{rental.beds}</Typography>
            <Typography>{rental.address}</Typography>
            {rental.petsAllowed && <PetsIcon />}
        </Box>
    );
};

export default Rental;