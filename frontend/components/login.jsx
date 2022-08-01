import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Formik } from 'formik';
import { Button, Grid, Typography } from '@mui/material';
import { borderColor } from '@mui/system';

const Login = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', width: "100%" }}
        >
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if ( //Test email format with regex
                        !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
                            .test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                        mt: 1,
                        width: '25%',
                        padding: 10,
                        borderStyle: "solid",
                        borderColor: 'black',
                        borderWidth: 2,
                        borderRadius: 5,
                    }}>
                        <TextField
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Email"
                            sx={{ width: "100%", }}
                        />
                        <br />
                        <Typography
                            sx={{
                                color: 'red',
                                mt: 1,
                                mb: 1,
                            }}>
                            {(errors.email && touched.email && errors.email) || '⠀'}
                        </Typography>
                        <br />
                        <TextField
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Password"
                            sx={{ width: "100%" }}
                        />
                        <br />
                        <Typography sx={{
                            color: 'red',
                            mt: 1,
                            mb: 1,
                        }}>
                            {(errors.password && touched.password && errors.password) || '⠀'}
                        </Typography>
                        <br />
                        <Button variant="contained" type="submit" disabled={isSubmitting} sx={{ width: '100%' }}>
                            Submit
                        </Button>
                    </Box>
                )}
            </Formik>
        </Grid>
    );
};

export default Login;