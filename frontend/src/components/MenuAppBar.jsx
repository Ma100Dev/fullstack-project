import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const MenuAppBar = () => {
    const user = useSelector(state => state.user)
    const isLoggedIn = Boolean(user)
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
            {isLoggedIn ? (
                <ButtonBase onClick={() => console.log('log out')}>
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
    )
}

export default MenuAppBar