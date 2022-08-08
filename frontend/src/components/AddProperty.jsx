import React from 'react';
import Box from '@mui/material/Box';
import { Formik } from 'formik';
import { Button, Grid, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
//import { useNavigate } from 'react-router-dom';
import FormikTextField from './FormikTextField';
//import axios from 'axios';
import * as Yup from 'yup';

const PropertySchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    description: Yup.string()
        .required('Description is required'),
    price: Yup.number()
        .required('Price is required')
        .positive('Price must be a positive number'),
    beds: Yup.number()
        .required('"Beds" is required')
        .min(1, '"Beds" must be at least 1'),
    address: Yup.string()
        .required('Address is required'),
    petsAllowed: Yup.boolean()
        .required('Pets allowed is required'),
    image: Yup.mixed()
        .required('Image is required'),
});


const AddProperty = () => {
    const [open, setOpen] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = React.useState('');
    //const navigate = useNavigate();
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
                initialValues={{ title: '', address: '', price: '', description: '', beds: '', petsAllowed: false, image: null }}
                validationSchema={PropertySchema}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log(values.image);
                    alert(JSON.stringify(values, null, 2));
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
                        <FormikTextField label="price" errors={errors} handleChange={handleChange} handleBlur={handleBlur} values={values} type="number" touched={touched} placeholder="Price" />
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
