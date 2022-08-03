import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const Profile = () => {
    const user = useSelector(state => state.user);
    const isLoggedIn = Boolean(user);
    const navigate = useNavigate();
    if (!isLoggedIn) {
        navigate("/login");
    }
    return (
        <div>
            <h1>Profile</h1>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Typography variant="h5">Name:</Typography>
                        </td>
                        <td>
                            <Typography variant="h5">{user.name}</Typography>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography variant="h5" sx={{ mr: 5 }}>Username:</Typography>
                        </td>
                        <td>
                            <Typography variant="h5">{user.username}</Typography>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography variant="h5">Email:</Typography>
                        </td>
                        <td>
                            <Typography variant="h5">{user.email}</Typography>
                        </td>
                    </tr>
                </tbody>
            </table>
            {
                //TODO implement profile picture, properties, modifying profile etc.
                //Backend changes also required.
            }
        </div>
    );
};

export default Profile;