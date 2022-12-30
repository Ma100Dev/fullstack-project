import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Formik } from 'formik';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '@reducers/userReducer';
import { BACKEND_URL } from '@utils/config';
import useCrypt from '@hooks/useCrypt';
import { addError } from '@reducers/errorReducer';

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required')
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [crypt, publicKey] = useCrypt();
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', width: '100%' }}
        >
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    let err = false;
                    try {
                        const newValues = { username: values.username, password: crypt.encrypt(publicKey, values.password) };
                        const { data } = await axios.post(`${BACKEND_URL}/login`, newValues)
                            .catch(error => {
                                dispatch(addError({ msg: error.response?.data?.error || "Couldn't connect to server" }));
                                err = true;
                            });
                        if (!err) {
                            localStorage.setItem('user', JSON.stringify(data));
                            dispatch(setUser(data));
                            setSubmitting(false);
                            navigate('/');
                        }
                        setSubmitting(false);
                    } catch (error) {
                        dispatch(addError({ msg: error.message || "Couldn't connect to server", title: 'An error occurred.' }));
                    }
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
