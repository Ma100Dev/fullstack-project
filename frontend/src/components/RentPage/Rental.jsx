import React from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { ReactComponent as DefaultImage } from './house.svg';
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

const Rental = ({ rental, fullView = false }) => {
    if (!rental) return null;
    const navigate = useNavigate();
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
            {
                !fullView ?
                    (
                        <ButtonBase
                            onClick={() => navigate(`/rent/${rental.id}`)}
                        >
                            <Content rental={rental} />
                        </ButtonBase>
                    ) : <Content rental={rental} showButtons={true} />
            }
        </Box >
    );
};
const Content = ({ rental, showButtons = false }) => {
    const imageProps = {
        style: {
            outline: '1px solid #ccc',
            borderRadius: '5px',
            padding: '5px',
            maxWidth: 852,
            maxHeight: 480,
        },
        alt: rental.title,
    };
    return (
        <>
            <Box>
                {rental.image ?
                    <img
                        src={`data:${rental.image.contentType};base64,${arrayBufferToBase64(rental.image.data.data)}`}
                        {...imageProps}
                    /> :
                    <DefaultImage {...imageProps} />}
            </Box>
            <Box sx={{ ml: 5, maxWidth: '60%', }} >
                <Typography variant="h5">{rental.title}</Typography>
                <Typography variant="subtitle2"
                    sx={{
                        fontSize: '0.8rem',
                        color: 'text.secondary',
                        fontStyle: 'italic',
                        textAlign: 'left',
                        mt: 1,
                        mb: 1,
                        ml: 1,
                        mr: 2,
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                    }}
                >{rental.description}</Typography>
                <Typography>Price per night: {rental.price}€</Typography>
                <Typography>Bed(s): {rental.beds}</Typography>
                <Typography>Address: {rental.address}</Typography>
                {rental.petsAllowed && <PetsIcon />}
            </Box>
            {showButtons && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }} >
                    <Button variant="contained">Rent now</Button>
                    <Button> Contact renter </Button>
                </Box>
            )}
        </>
    );
};

const rentalPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
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
});

Content.propTypes = {
    rental: rentalPropType,
    showButtons: PropTypes.bool,
};

Rental.propTypes = {
    rental: rentalPropType,
    fullView: PropTypes.bool,
};

export default Rental;