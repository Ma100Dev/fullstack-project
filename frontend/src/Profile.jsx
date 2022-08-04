import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import propTypes from 'prop-types';
import * as yup from 'yup';

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
        .required('Email address is equired'),
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
    const user = useSelector(state => state.user);
    const isLoggedIn = Boolean(user);
    const navigate = useNavigate();
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
            console.log(values);
        }
    };
    if (!isLoggedIn) {
        navigate('/login');
    }
    return (
        <div>
            {
                //TODO implement profile picture, properties, modifying profile etc.
                //Backend changes also required.
            }
            <h1>Profile</h1>
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
        </div>
    );
};

Profile.propTypes = {
    editMode: propTypes.bool,
};

export default Profile;