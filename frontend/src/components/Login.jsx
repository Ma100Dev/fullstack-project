import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Formik } from 'formik';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { BACKEND_URL } from '../utils/config';

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required')
});

const Login = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', width: '100%' }}
        >
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Error!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    let error = false;
                    const { data } = await axios.post(`${BACKEND_URL}/login`, values)
                        .catch(error => {
                            setError(error.response?.data?.error);
                            setOpen(true);
                            error = true;
                        });
                    if (!error) {
                        localStorage.setItem('user', JSON.stringify(data));
                        dispatch(setUser(data));
                        setSubmitting(false);
                        navigate('/');
                    }
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            mt: 1,
                            width: '25%',
                            padding: 10,
                            borderStyle: 'solid',
                            borderColor: 'black',
                            borderWidth: 2,
                            borderRadius: 5,
                        }}
                    >
                        <TextField
                            type="username"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            placeholder="Username"
                            sx={{ width: '100%' }}
                        />
                        <br />
                        <Typography
                            sx={{
                                color: 'red',
                                mt: 1,
                                mb: 1,
                            }}
                        >
                            {(errors.username && touched.username && errors.username) || '⠀'}
                        </Typography>
                        <br />
                        <TextField
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Password"
                            sx={{ width: '100%' }}
                        />
                        <br />
                        <Typography sx={{
                            color: 'red',
                            mt: 1,
                            mb: 1,
                        }}
                        >
                            {(errors.password && touched.password && errors.password) || '⠀'}
                        </Typography>
                        <br />
                        <Button variant="contained" type="submit" disabled={isSubmitting} sx={{ width: '100%' }}>
                            Submit
                        </Button>
                        <Typography sx={{ mt: 1 }}>
                            {'Don\'t have an account?'}
                            <Link to="/signUp">
                                <Button>Sign up</Button>
                            </Link>
                        </Typography>
                    </Box>
                )}
            </Formik>
        </Grid>
    );
};

export default Login;
