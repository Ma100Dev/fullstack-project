import { useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import { BACKEND_URL } from '@utils/config';
import useUser from '@hooks/useUser';
import RentalImage from './RentalImage';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Rental = ({ rental, fullView = false }) => {
    const navigate = useNavigate();
    const user = useUser(true);
    if (!rental) return null;
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
                    ) : <Content rental={rental} showButtons={true} user={user} navigate={navigate} />
            }
        </Box >
    );
};
const Content = ({ rental, showButtons = false, user, navigate }) => {
    const dateAlreadyReserved = (date) => rental.reservations.some(reservation => {
        const startDate = new Date(reservation.startDate);
        const endDate = new Date(reservation.endDate);
        return date >= startDate && date <= endDate;
    });
    const [showCalendar, setShowCalendar] = useState(false);
    const [dates, setDates] = useState([]);
    const imageProps = {
        style: {
            outline: '1px solid #ccc',
            borderRadius: '5px',
            padding: '5px',
            maxWidth: 852,
            maxHeight: 480,
            width: '100%',
            height: '100%',
        },
        alt: rental.title,
    };
    return (
        <>
            <RentalImage rental={rental} imageProps={imageProps} />
            <Box sx={{ ml: 5, maxWidth: '60%', }} >
                <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>{rental.title}</Typography>
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
                <Typography>Price: {rental.price}€ per {rental.pricePer}</Typography>
                <Typography>Count (e.g. beds): {rental.beds}</Typography>
                <Typography>Address: {rental.address}</Typography>
                <br />
                <Typography color="gray">Posted by: &quot;{rental.owner.username}&quot; ({rental.owner.name})</Typography>
                {rental.petsAllowed && <PetsIcon />}
            </Box>
            {
                showButtons && <>
                    {Object.keys(user).length !== 0 ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }} >
                            {rental.allowCalendarBooking &&
                                <Button variant="contained" onClick={() => setShowCalendar(!showCalendar)} sx={{ mb: 2 }}>Rent now</Button>
                            }
                            {showCalendar && <>
                                <Typography variant='body2'>Choose dates.<br />
                                    Click once to select start date and again to select end date.
                                </Typography>
                                <Calendar
                                    minDate={new Date()}
                                    selectRange={true}
                                    showWeekNumbers={true}
                                    returnValue="range"
                                    allowPartialRange={false}
                                    onChange={(dates) => {
                                        setDates(dates);
                                    }}
                                    tileContent={({ date, view }) =>
                                        view === 'month' && dateAlreadyReserved(date) ? <div style={
                                            { backgroundColor: 'red', color: 'white', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }
                                        } /> : null
                                    }
                                    tileDisabled={({ date }) => dateAlreadyReserved(date)}
                                />
                                {dates[0] &&
                                    <Button sx={{ mt: 2 }} variant="contained" onClick={async () => {
                                        if (dates?.length === 2) {
                                            const invalid = rental.reservations.some(reservation => {
                                                const startDate = new Date(reservation.startDate);
                                                const endDate = new Date(reservation.endDate);
                                                return dates[0] <= endDate && startDate <= dates[1];
                                            });
                                            if (invalid) {
                                                // eslint-disable-next-line no-alert
                                                alert('Reservation overlaps with an existing reservation. Please select different dates.');
                                                // TODO: show error message instead of alert
                                                return;
                                            }
                                            // eslint-disable-next-line no-unused-vars
                                            const { status } = await axios.post(`${BACKEND_URL}/properties/${rental.id}/reservations`,
                                                {
                                                    startDate: dates[0].toISOString(),
                                                    endDate: dates[1].toISOString(),
                                                },
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${user.token}`
                                                    }
                                                }
                                            );
                                            if (status === 201) {
                                                navigate('/profile#reservations');
                                            }
                                        }
                                    }}>
                                        Rent from {dates[0].toLocaleDateString()} to {dates[1].toLocaleDateString()}
                                    </Button>
                                }
                            </>}
                            <Button sx={{ mt: 2 }} onClick={async () => {
                                const { data } = await axios.get(`${BACKEND_URL}/conversations/${rental.id}`,
                                    {
                                        headers: {
                                            'Authorization': `Bearer ${user.token}`
                                        }
                                    });
                                if (data !== null) {
                                    navigate(`/messages/${data.id}`);
                                } else {
                                    const { data } = await axios.post(`${BACKEND_URL}/conversations`,
                                        {
                                            property: rental.id,
                                        },
                                        {
                                            headers: {
                                                'Authorization': `Bearer ${user.token}`
                                            }
                                            // eslint-disable-next-line no-unused-vars
                                        }).catch((err) => {
                                            // console.error(err.response.data.error); // TODO: handle error, global error handler
                                        });
                                    navigate(`/messages/${data.id}?new=true`);
                                }

                            }}> Contact renter </Button>
                        </Box>
                    ) : <Typography>You need to log in order to rent.</Typography>
                    }
                </>
            }
        </>
    );
};

const rentalPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pricePer: PropTypes.string.isRequired,
    beds: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    petsAllowed: PropTypes.bool.isRequired,
    allowCalendarBooking: PropTypes.bool.isRequired,
    reservations: PropTypes.arrayOf(PropTypes.shape({
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
    })),
    owner: PropTypes.shape({
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.shape({
        contentType: PropTypes.string.isRequired,
        data: PropTypes.shape({
            data: PropTypes.array.isRequired,
        }).isRequired,
    })
});

Content.propTypes = {
    rental: rentalPropType.isRequired,
    showButtons: PropTypes.bool,
    user: PropTypes.object,
    navigate: PropTypes.func,
};

Rental.propTypes = {
    rental: rentalPropType,
    fullView: PropTypes.bool,
};

export default Rental;
