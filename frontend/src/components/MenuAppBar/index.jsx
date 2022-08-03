import React from 'react';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../reducers/userReducer';
import MenuItem from './MenuItem';

const MenuAppBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const isLoggedIn = Boolean(user);
    return (
        <Box sx={{
            flexGrow: 1,
            mb: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            outlineStyle: 'solid',
            outlineWidth: '1px',
            outlineColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <MenuItem text="Home" link="/" />
            <MenuItem text="Rent" link="/rent" />
            {isLoggedIn ? (
                <MenuItem text="Log out" isButton={true} onClick={() => dispatch(clearUser())} />
            ) : (
                <>
                    <MenuItem text="Log in" link="/login" />
                    <MenuItem text="Sign up" link="/signUp" />
                </>
            )}
        </Box>
    );
};

export default MenuAppBar;