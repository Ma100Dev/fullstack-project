import { useEffect, useState } from 'react';

// TODO implement profile picture
// Backend changes also required

import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import propTypes from 'prop-types';
import * as yup from 'yup';
import axios from 'axios';
import Rental from '../rental/RentPage/Rental';
import useUser from '../../../hooks/useUser';
import LoadingIndicator from '../../reusables/LoadingIndicator';
import useCrypt from '../../../hooks/useCrypt';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../reducers/userReducer';
import Collapsible from '../../reusables/Collapsible';
import { BACKEND_URL } from '../../../utils/config';
import { Box } from '@mui/system';
import format from 'date-fns/format';

const editValidationSchema = yup.object().shape({
    username: yup.string()
        .min(3, 'Username must be at least 3 characters long')
        .max(20, 'Username must be at most 20 characters long')
        .required('Username is required'),
    name: yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .notRequired(),
    email: yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
    password: yup.string()
        .required('Password is required'),
});

const TypographyProps = {
    variant: 'h5',
    sx: {
        mr: 5,
    },
};

const Profile = ({ editMode = false }) => {
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    let localUser = useUser();
    const [crypt, publicKey] = useCrypt();
    const dispatch = useDispatch();

    const [user, setUser] = useState({});
    useEffect(() => {
        if (Object.keys(user).length === 0) {
            axios.get(`${BACKEND_URL}/users/` + localUser.id).then(res => {
                setUser(res.data);
            });
        }
    }, [user, setUser, localUser.id]);

    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            axios.get(`${BACKEND_URL}/reservations/`, {
                headers: {
                    Authorization: `Bearer ${localUser.token}`
                }
            }).then(res => {
                setReservations(res.data);
            });
        }
    }, [user, setReservations, localUser.token]);

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!editMode) {
            navigate('/');
        }
        const values = {
            email: event.target.email.value,
            password: crypt.encrypt(publicKey, event.target.password.value),
            username: event.target.username.value,
            name: event.target.name.value
        };
        let error = false;
        await editValidationSchema.validate(values).catch(err => {
            setErrors(err.errors);
            error = true;
        });
        if (!error) {
            await (axios.put(`${BACKEND_URL}/users/${localUser.id}`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${localUser.token}`
                    }
                }
            )).catch(err => {
                setErrors([err.response.data.error]);
                error = true;
            });
            if (!error) {
                setUser({});
                navigate('/profile');
            }
        }
    };
    if (Object.keys(user).length === 0) {
        return (
            <LoadingIndicator />
        );
    }
    return (
        <div>
            <Typography variant='h4'>Profile</Typography>
            <form onSubmit={onSubmit} style={{
                marginTop: '1rem',
                marginBottom: '1rem'
            }}>
                <Typography {...{ ...TypographyProps, sx: { color: 'red' } }}>{errors.join(', ')}</Typography>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Typography {...TypographyProps}>Name:</Typography>
                            </td>
                            <td>
                                {editMode ?
                                    <TextField
                                        name="name"
                                        defaultValue={user.name}
                                        placeholder="Name"
                                    /> :
                                    <Typography {...TypographyProps}>{user.name}</Typography>
                                }
                            </td>
                            {
                                !editMode &&
                                <td>
                                    <IconButton onClick={() => navigate('/profile/edit')}>
                                        <EditIcon />
                                    </IconButton>
                                </td>
                            }
                        </tr>
                        <tr>
                            <td>
                                <Typography {...TypographyProps}>Username:</Typography>
                            </td>
                            <td>
                                {editMode ?
                                    <TextField
                                        name="username"
                                        defaultValue={user.username}
                                        placeholder="Username"
                                    /> :
                                    <Typography {...TypographyProps}>{user.username}</Typography>
                                }
                            </td>
                            {
                                !editMode &&
                                <td>
                                    <IconButton onClick={() => navigate('/profile/edit')}>
                                        <EditIcon />
                                    </IconButton>
                                </td>
                            }
                        </tr>
                        <tr>
                            <td>
                                <Typography {...TypographyProps}>Email:</Typography>
                            </td>
                            <td>
                                {editMode ?
                                    <TextField
                                        name="email"
                                        defaultValue={user.email}
                                        placeholder="Email"
                                    /> :
                                    <Typography {...TypographyProps}>{user.email}</Typography>
                                }
                            </td>
                            {
                                !editMode &&
                                <td>
                                    <IconButton onClick={() => navigate('/profile/edit')}>
                                        <EditIcon />
                                    </IconButton>
                                </td>
                            }
                        </tr>
                        {
                            editMode &&
                            <>
                                <tr>
                                    <td>
                                        <Typography {...TypographyProps}>Password:</Typography>
                                    </td>
                                    <td>
                                        <TextField name="password" type="password" placeholder="Enter your password to confirm" sx={{}} />
                                    </td>
                                </tr >
                            </>
                        }
                    </tbody>
                </table>
                {
                    editMode &&
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Button variant="contained" type="submit">Save</Button>
                                </td>
                                <td>
                                    <Button variant="contained" color="error" onClick={() => navigate('/profile')}>Cancel</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
            </form>
            <Button variant="contained" color="error" sx={{
                position: 'absolute',
                top: '10em',
                right: 5

            }} onClick={() => {
                // TODO: Add confirmation dialog for account deletion
                // eslint-disable-next-line no-alert
                const confirmation = confirm('Are you sure you want to delete your account?');
                if (confirmation) {
                    axios.delete(`${BACKEND_URL}users/${localUser.id}`, {
                        headers: {
                            authorization: `Bearer ${localUser.token}`
                        }
                    }).then(() => {
                        localStorage.removeItem('user');
                        dispatch(clearUser());
                        navigate('/');
                    }
                    );
                }
            }}>Delete account</Button>
            {reservations.length !== 0 &&
                <Collapsible title="Your bookings" titleVariant='h4' id="reservations">
                    {reservations.map(reservation => (
                        <Box key={reservation.id} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem',
                            border: '1px solid black',
                            borderRadius: '5px',
                            margin: '1rem'
                        }}>
                            <Typography variant="h5">{reservation.property.title}</Typography>
                            <Typography variant="h6" color="text.secondary">{reservation.property.address}</Typography>
                            <Typography variant="h6">
                                From
                                {` ${format(new Date(reservation.startDate), 'dd.MM.yyyy')} `}
                                to
                                {` ${format(new Date(reservation.endDate), 'dd.MM.yyyy')}`}
                            </Typography>
                            <Typography variant="h6">Total price: TODO</Typography>
                            <Button variant="contained" color="error" onClick={() => {
                                null; // TODO: Add cancellation logic
                            }}>Cancel reservation</Button>
                        </Box>

                    ))}
                </Collapsible>
            }
            {user.properties &&
                <Collapsible title="Your properties" titleVariant="h4" id="properties">
                    {user.properties.map(property => (
                        <Rental rental={property} key={property.id} />
                    ))}
                </Collapsible>
            }
        </div>
    );
};

Profile.propTypes = {
    editMode: propTypes.bool,
};

export default Profile;
