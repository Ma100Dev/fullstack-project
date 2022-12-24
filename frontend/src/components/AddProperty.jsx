import React from 'react';
import Box from '@mui/material/Box';
import { Formik } from 'formik';

import {
    Button, Grid, Typography, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle,
    Checkbox, FormControlLabel, Select, MenuItem,
    InputLabel, FormControl
} from '@mui/material';

// import { useNavigate } from 'react-router-dom';
import FormikTextField from './FormikTextField';
import axios from 'axios';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import { BACKEND_URL } from '../utils/config';

const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(
        file,
        1280,
        720,
        'WEBP',
        100,
        0,
        uri => {
            resolve(uri);
        },
        'file'
    );
});

const PropertySchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    description: Yup.string()
        .required('Description is required'),
    price: Yup.number()
        .required('Price is required')
        .positive('Price must be a positive number'),
    pricePer: Yup.string()
        .required('Price per is required'),
    beds: Yup.number()
        .required('"Beds" is required')
        .min(1, '"Beds" must be at least 1'),
    address: Yup.string()
        .required('Address is required'),
    petsAllowed: Yup.boolean()
        .required('Pets allowed is required'),
    image: Yup.mixed()
        .required('Image is required')
        .test('fileSize', 'The file is too large', (value) => {
            if (!value.size) {
                return false;
            }
            return value.size < 10485760; // 10MiB
        }),
});


const AddProperty = () => {
    let user = useSelector(state => state.user);
    const [open, setOpen] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = React.useState('');
    // const navigate = useNavigate();
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
                initialValues={{ title: '', address: '', price: '', pricePer: '', description: '', beds: '', petsAllowed: false, image: null }}
                validationSchema={PropertySchema}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log(values);
                    const formData = new FormData();
                    const image = await resizeFile(values.image);
                    formData.append('image', image);
                    formData.append('title', values.title);
                    formData.append('address', values.address);
                    formData.append('price', values.price);
                    formData.append('pricePer', values.pricePer);
                    formData.append('description', values.description);
                    formData.append('beds', values.beds);
                    formData.append('petsAllowed', values.petsAllowed);
                    await axios.post(`${BACKEND_URL}/properties`,
                        formData,
                        {
                            headers: {
                                'Authorization': `Bearer ${user.token}`
                            }
                        });
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
                    setFieldValue,
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

                        <FormikTextField label="title" errors={errors} handleChange={handleChange} handleBlur={handleBlur} values={values} type="text" touched={touched} placeholder="Title" />
                        <FormikTextField label="address" errors={errors} handleChange={handleChange} handleBlur={handleBlur} values={values} type="text" touched={touched} placeholder="Address" />
                        <FormikTextField label="price" errors={errors} handleChange={handleChange} handleBlur={handleBlur} values={values} type="number" touched={touched} placeholder="Price (€)" />
                        <FormControl fullWidth sx={{ mb: '2.5rem' }}>
                            <InputLabel id="price-per-label">Price per</InputLabel>
                            <Select
                                label="Price per"
                                labelId="price-per-label"
                                required
                                value={values.pricePer}
                            >
                                <MenuItem value="night">Night</MenuItem>
                                <MenuItem value="week">Week</MenuItem>
                                <MenuItem value="month">Month</MenuItem>
                                <MenuItem value="year">Year</MenuItem>
                                <MenuItem value="day">Day</MenuItem>
                                <MenuItem value="hour">Hour</MenuItem>
                                <MenuItem value="weekend">Weekend</MenuItem>
                            </Select>
                        </FormControl>
                        <FormikTextField label="description" errors={errors} handleChange={handleChange} handleBlur={handleBlur} values={values} type="text" touched={touched} placeholder="Description" />
                        <FormikTextField label="beds" errors={errors} handleChange={handleChange} handleBlur={handleBlur} values={values} type="number" touched={touched} placeholder="Beds" />

                        <FormControlLabel control={
                            <Checkbox sx={{ mb: 0.5 }} name="petsAllowed" onChange={handleChange} onBlur={handleBlur} value={values.petsAllowed} />
                        }
                            label="Pets allowed?"
                            labelPlacement="start"
                        />
                        <br />

                        <FormControlLabel control={
                            <input id="image" name="image" type="file" onChange={(event) => {
                                setFieldValue('image', event.currentTarget.files[0]);
                            }} />
                        } label={<Typography sx={{ mr: 1 }}>Image: </Typography>} sx={{ mr: 1, mt: 2, mb: 1 }} labelPlacement="start" />
                        <Typography
                            sx={{
                                color: 'red',
                                mt: 1,
                                mb: 2,
                            }}
                        >
                            {(errors.image && touched.image && errors.image)}
                        </Typography>

                        <Button variant="contained" type="submit" disabled={isSubmitting} sx={{ width: '100%' }}>
                            Submit
                        </Button>
                    </Box>
                )}
            </Formik>
        </Grid>
    );
};

export default AddProperty;
