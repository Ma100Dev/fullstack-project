import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const PageSelector = ({ pageCount, rentals, onChange }) => {
    const [page, setPage] = useState(1);
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
                    onClick={async () => {
                        if (p === page) return;
                        onChange && onChange(p);
                        const data = await rentals.fetchData(p);
                        await rentals.setRentalState(data);
                        setPage(p);
                        window.scrollTo(0, 0);
                    }}
                >
                    {p}
                </button>
            ))}
        </Box>
    );
};

PageSelector.propTypes = {
    pageCount: PropTypes.number.isRequired,
    rentals: PropTypes.object,
    onChange: PropTypes.func,
};

export default PageSelector;
