import React from 'react';
import { TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const FormikTextField = ({ label, errors, handleChange, handleBlur, values, type = 'text', touched, placeholder }) => (<>
    <TextField
        type={type}
        name={label}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[label]}
        placeholder={placeholder}
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
        {(errors[label] && touched[label] && errors[label]) || '⠀'}
    </Typography>
</>);

FormikTextField.propTypes = {
    label: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    type: PropTypes.string,
    touched: PropTypes.object.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default FormikTextField;
