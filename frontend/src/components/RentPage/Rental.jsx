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
                borderRadius: "5px",
            }}
        >
            <Typography variant="h5">{rental.title}</Typography>
            <Typography variant="subtitle2"
                sx={{
                    fontSize: "0.8rem",
                    color: "text.secondary",
                    fontStyle: "italic",
                    mt: 1,
                    mb: 1,
                    ml: 1,
                    mr: 2,
                }}
            >{rental.description}</Typography>
            <Typography>Price per night: {rental.price}</Typography>
            <Typography>Bed(s): {rental.beds}</Typography>
            <Typography>Address: {rental.address}</Typography>
            {rental.petsAllowed && <PetsIcon />}
        </Box>
    );
};

export default Rental;