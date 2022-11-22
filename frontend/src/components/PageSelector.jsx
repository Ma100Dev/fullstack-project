import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const PageSelector = ({ page, setPage, pageCount }) => {
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
    return (
        <Box className="page-selector" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1rem',
        }}>
            {pages.map(p => (
                <button
                    key={p}
                    style={{
                        backgroundColor: p === page ? 'black' : 'white',
                        color: p === page ? 'white' : 'black',
                        border: '1px solid black',
                        padding: '0.5rem',
                        margin: '0.5rem',
                    }}
                    onClick={() => setPage(p)}
                >
                    {p}
                </button>
            ))}
        </Box>
    );
};

PageSelector.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    pageCount: PropTypes.number,
};

export default PageSelector;