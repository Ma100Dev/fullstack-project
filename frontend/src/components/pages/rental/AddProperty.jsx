import Box from '@mui/material/Box';
import { Formik } from 'formik';

import {
    Button, Grid, Typography, Autocomplete,
    Checkbox, FormControlLabel, Select, MenuItem,
    InputLabel, FormControl, TextField
} from '@mui/material';

import FormikTextField from '@reusables/FormikTextField';
import axios from 'axios';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addError } from '@reducers/errorReducer';
import Resizer from 'react-image-file-resizer';
import { BACKEND_URL } from '@utils/config';
import { getTLDs } from '@utils/tlds';

const resizeFile = (file) => new Promise(resolve => {
    // TODO: Add timeout to scaling to avoid freezing
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
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters long'),
    description: Yup.string()
        .required('Description is required')
        .min(50, 'Description must be at least 50 characters long'),
    price: Yup.number()
        .required('Price is required')
        .positive('Price must be a positive number'),
    pricePer: Yup.string()
        .required('Price per is required'),
    beds: Yup.number()
        .required('"Count" is required')
        .min(1, '"Count" must be at least 1'),
    address: Yup.string()
        .required('Address is required')
        .min(5, 'Address must be at least 5 characters long'),
    country: Yup.string()
        .required('Country is required')
        .nullable(),
    petsAllowed: Yup.boolean()
        .required('Pets allowed is required'),
    image: Yup.mixed()
        .required('Image is required')
        .test('fileSize', 'The file is too large', (value) => {
            if (!value?.size) {
                return false;
            }
            return value.size < 10485760; // 10MiB
        }),
});


const AddProperty = () => {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();
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
                initialValues={{ title: '', address: '', country: '', price: '', pricePer: '', description: '', beds: '', petsAllowed: false, image: null }}
                validationSchema={PropertySchema}
                onSubmit={async (values, { setSubmitting }) => {
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
                    formData.append('allowCalendarBooking', values.allowCalendarBooking);
                    await axios.post(`${BACKEND_URL}/properties`,
                        formData,
                        {
                            headers: {
                                'Authorization': `Bearer ${user.token}`
                            }
                        }).catch((err) => {
                            dispatch(addError({ msg: err.response?.data?.error || err.response?.statusCode, title: 'Error' }));
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
                        <Autocomplete
                            name="country"
                            disablePortal
                            value={values.country || null}
                            onChange={(event, newValue) => {
                                setFieldValue('country', newValue);
                            }}
                            options={getTLDs().map((tld) => tld.Entity)}
                            renderInput={(params) => <TextField {...params} label="Country" />}
                        >
                        </Autocomplete>
                        <Typography
                            sx={{
                                color: 'red',
                                mt: 1,
                                mb: 1,
                            }}
                        >
                            {(errors.country && touched.country && errors.country) || '⠀'}
                        </Typography>

                        <FormikTextField label="price" errors={errors} handleChange={handleChange} handleBlur={handleBlur} values={values} type="number" touched={touched} placeholder="Price (€)" />
                        <FormControl fullWidth>
                            <InputLabel id="price-per-label">Price per</InputLabel>
                            <Select
                                label="Price per"
                                name="pricePer"
                                labelId="price-per-label"
                                required
                                value={values.pricePer}
                                onChange={handleChange}
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
                        <Typography
                            sx={{
                                color: 'red',
                                mt: 1,
                                mb: 1,
                            }}
                        >
                            {(errors.pricePer && touched.pricePer && errors.pricePer) || '⠀'}
                        </Typography>
                        <FormikTextField label="description" errors={errors} handleChange={handleChange} handleBlur={handleBlur} values={values} type="text" touched={touched} placeholder="Description" multiline />
                        <FormikTextField label="beds" errors={errors} handleChange={handleChange} handleBlur={handleBlur} values={values} type="number" touched={touched} placeholder="Count (Beds, etc.)" />

                        <FormControlLabel control={
                            <Checkbox sx={{ mb: 0.5 }} name="petsAllowed" onChange={handleChange} onBlur={handleBlur} value={values.petsAllowed} />
                        }
                            label="Pets allowed?"
                            labelPlacement="start"
                        />
                        <br />

                        <FormControlLabel control={
                            <Checkbox sx={{ mb: 0.5 }} name="allowCalendarBooking" onChange={handleChange} onBlur={handleBlur} value={values.allowCalendarBooking}
                                disabled={values.pricePer !== 'day'}
                            />
                        }
                            label="Allow guests to book using the calendar? (If not, you will have to manually approve each booking and set the dates)"
                            labelPlacement="start"
                        />
                        <br />

                        <FormControlLabel control={
                            <input id="image" accept='.jpg,.jpeg,.png,.webp' name="image" type="file" onChange={(event) => {
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
