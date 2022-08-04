import React from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { ReactComponent as DefaultImage } from './house.svg';

const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

const Rental = ({ rental }) => {
    const imageProps = {
        style: {
            outline: '1px solid #ccc',
            borderRadius: '5px',
            padding: '5px',
            maxWidth: 1280,
            maxHeight: 720,
        },
        alt: rental.title,
    };
    return (
        <Box
            sx={{
                outline: '1px solid #ccc',
                p: 3,
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Box>
                {rental.image ?
                    <img
                        src={`data:${rental.image.contentType};base64,${arrayBufferToBase64(rental.image.data.data)}`}
                        {...imageProps}
                    /> :
                    <DefaultImage {...imageProps} />}
            </Box>
            <Box sx={{ ml: 5 }}>
                <Typography variant="h5">{rental.title}</Typography>
                <Typography variant="subtitle2"
                    sx={{
                        fontSize: '0.8rem',
                        color: 'text.secondary',
                        fontStyle: 'italic',
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
        </Box>
    );
};

Rental.propTypes = {
    rental: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        beds: PropTypes.number.isRequired,
        address: PropTypes.string.isRequired,
        petsAllowed: PropTypes.bool.isRequired,
        image: PropTypes.shape({
            contentType: PropTypes.string.isRequired,
            data: PropTypes.shape({
                data: PropTypes.array.isRequired,
            }).isRequired,
        })
    }).isRequired,
};

export default Rental;