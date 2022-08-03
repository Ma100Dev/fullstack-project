import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
            <p>{JSON.stringify(user)}</p>
        </div>
    );
};

export default Profile;