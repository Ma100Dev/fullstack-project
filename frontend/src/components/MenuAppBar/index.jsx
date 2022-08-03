import React from 'react';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../reducers/userReducer';

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
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1, mt: 1, ml: 2, mb: 1, mr: 1 }}>
                <Link to="/">
                    Home
                </Link>
            </Typography>
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1, mt: 1, ml: 2, mb: 1, mr: 1 }}>
                <Link to="/rent">
                    Rent
                </Link>
            </Typography>
            {isLoggedIn ? (
                <ButtonBase onClick={() => dispatch(clearUser())}>
                    <Typography variant="h6" color="inherit" sx={{ flexGrow: 1, mt: 1, ml: 2, mb: 1, mr: 1 }}>
                        Log out
                    </Typography>
                </ButtonBase>
            ) : (
                <>
                    <Typography variant="h6" color="inherit" sx={{ flexGrow: 1, mt: 1, ml: 2, mb: 1, mr: 1 }}>
                        <Link to="/login">
                            Log in
                        </Link>
                    </Typography>
                    <Typography variant="h6" color="inherit" sx={{ flexGrow: 1, mt: 1, ml: 2, mb: 1, mr: 1 }}>
                        <Link to="/signUp">
                            Sign up
                        </Link>
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default MenuAppBar;