import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const typographyProps = {
    variant: 'h6',
    color: 'inherit',
    sx: { flexGrow: 1, mt: 1, ml: 2, mb: 1, mr: 1 }
};

const MenuItem = ({ text, link, isButton = false, onClick }) => (
    <>
        {
            isButton ?
                <ButtonBase onClick={onClick}>
                    <Typography {...typographyProps}>{text}</Typography>
                </ButtonBase> :
                <Link to={link}>
                    <Typography {...typographyProps}>{text}</Typography>
                </Link>
        }
    </>
);

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    isButton: PropTypes.bool,
    link: (props, propName, componentName) => {
        if (!props.isButton && typeof props[propName] !== 'string') {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    },
    onClick: PropTypes.func
};

export default MenuItem;
