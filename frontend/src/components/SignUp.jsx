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

const SignUp = () => {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");
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
                initialValues={{ email: '', name: '', username: '', password: '' }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.username) {
                        errors.username = 'Required';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    let error = false;
                    const { data } = await axios.post('http://localhost:3001/api/users', values)
                        .catch(error => {
                            setError(error.response?.data?.error);
                            setOpen(true);
                            error = true;
                        });
                    const signUpData = { ...data };
                    if (!error) {
                        const { data } = await axios.post('http://localhost:3001/api/login', { username: signUpData.username, password: values.password })
                            .catch(error => {
                                setError(error.response?.data?.error);
                                setOpen(true);
                                error = true;
                            });
                        if (!error) {
                            localStorage.setItem('user', JSON.stringify(data));
                            setSubmitting(false);
                            navigate('/');
                        }
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
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="E-mail"
                            sx={{ width: '100%' }}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                mt: 1,
                                mb: 1,
                            }}
                        >
                            {(errors.email && touched.email && errors.email) || '⠀'}
                        </Typography>
                        <TextField
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder="Name"
                            sx={{ width: '100%' }}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                mt: 1,
                                mb: 1,
                            }}
                        >
                            {(errors.name && touched.name && errors.name) || '⠀'}
                        </Typography>
                        <TextField
                            type="username"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            placeholder="Username"
                            sx={{ width: '100%' }}
                        />
                        <Typography
                            sx={{
                                color: 'red',
                                mt: 1,
                                mb: 1,
                            }}
                        >
                            {(errors.username && touched.username && errors.username) || '⠀'}
                        </Typography>
                        <TextField
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Password"
                            sx={{ width: '100%' }}
                        />
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
                            Already have an account?
                            <Link to="/login">
                                <Button>Log in</Button>
                            </Link>
                        </Typography>
                    </Box>
                )}
            </Formik>
        </Grid>
    );
}

export default SignUp;