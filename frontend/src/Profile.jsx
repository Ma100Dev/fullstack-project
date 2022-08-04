import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import propTypes from "prop-types";

const TypographyProps = {
    variant: "h5",
    sx: {
        mr: 5,
    },
};

const Profile = ({ editMode = false }) => {
    const user = useSelector(state => state.user);
    const isLoggedIn = Boolean(user);
    const navigate = useNavigate();
    const onSubmit = (event) => {
        event.preventDefault();
        if (!editMode) {
            navigate("/");
        }
        console.log(event.target.email.value, event.target.password.value, event.target.username.value, event.target.name.value);
    };
    if (!isLoggedIn) {
        navigate("/login");
    }
    return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={onSubmit}>
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
                                    <IconButton onClick={() => navigate("/profile/edit")}>
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
                                    <IconButton onClick={() => navigate("/profile/edit")}>
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
                                    <IconButton onClick={() => navigate("/profile/edit")}>
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
                                        <TextField name="password" type="password" placeholder="Password" />
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
                                    <Button variant="contained" color="error" onClick={() => navigate("/profile")}>Cancel</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
                {
                    //TODO implement profile picture, properties, modifying profile etc.
                    //Backend changes also required.
                }
            </form>
        </div>
    );
};

Profile.propTypes = {
    editMode: propTypes.bool,
};

export default Profile;