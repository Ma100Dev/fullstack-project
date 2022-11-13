import React, { useEffect } from 'react';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NeedEmailVerification = () => {
    const navigate = useNavigate();
    const user = useUser();
    useEffect(() => {
        if (user.emailVerified) {
            navigate('/');
        }
    }, [user, navigate]);
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10rem',
        }}>
            <Typography variant='h2'>Need Email Verification</Typography>
            <Typography>
                Please verify your email address by clicking the link in the email
                we sent you.
            </Typography>
            <Typography>
                If you did not receive an email, please check your spam folder or{' '}
                <Button
                    onClick={() => {
                        alert('Not implemented yet');
                    }}
                >
                    click here
                </Button>{' '}
                to send another email.
            </Typography>
        </div>
    );
};

export default NeedEmailVerification;
