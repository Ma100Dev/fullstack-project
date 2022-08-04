import React from 'react';

//TODO implement profile picture
//Backend changes also required

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import propTypes from 'prop-types';
import * as yup from 'yup';
import axios from 'axios';
import Rental from './RentPage/Rental';

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
    const [errors, setErrors] = React.useState([]);
    const navigate = useNavigate();
    let localUser = useSelector(state => state.user);
    if (!localUser) {
        localUser = {};
    }
    React.useEffect(() => {
        if (Object.keys(localUser).length === 0) {
            navigate('/login');
        }
    }, [localUser, navigate]);
    const [user, setUser] = React.useState({});
    React.useEffect(() => {
        if (Object.keys(user).length === 0) {
            axios.get('/api/users/' + localUser.id).then(res => {
                setUser(res.data);
            });
        }
    }, [user, setUser]);
    const onSubmit = async (event) => {
        event.preventDefault();
        if (!editMode) {
            navigate('/');
        }
        const values = {
            email: event.target.email.value,
            password: event.target.password.value,
            username: event.target.username.value,
            name: event.target.name.value
        };
        let error = false;
        await editValidationSchema.validate(values).catch(err => {
            setErrors(err.errors);
            error = true;
        });
        if (!error) {
            await (axios.put(`/api/users/${localUser.id}`,
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
            <Box sx={{
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'height': '100vh'
            }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <div>
            <Typography variant='h4'>Profile</Typography>
            <form onSubmit={onSubmit}>
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
            <Typography variant='h4'>Your properties</Typography>
            {user.properties.map(property => (
                <Rental rental={property} key={property.id} />
            ))}
        </div>
    );
};

Profile.propTypes = {
    editMode: propTypes.bool,
};

export default Profile;