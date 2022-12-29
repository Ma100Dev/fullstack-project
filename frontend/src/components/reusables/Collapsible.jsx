import { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';

const Collapsible = ({ children, title, titleVariant = 'body1', open = false }) => {
    const [isOpen, setIsOpen] = useState(open);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <Box onClick={toggleOpen} sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                cursor: 'pointer',
            }}>
                <ChevronRightIcon
                    style={{
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                    }}
                />
                <Typography variant={titleVariant}> {title} </Typography>
            </Box>
            <Box>
                {isOpen && children}
            </Box>
        </>
    );
};

Collapsible.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    titleVariant: PropTypes.string,
    open: PropTypes.bool,
};

export default Collapsible;
