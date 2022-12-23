import React, { useEffect, useCallback } from 'react';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { BACKEND_URL } from '../utils/config';
import * as _ from 'lodash';

const NeedEmailVerification = () => {
    const navigate = useNavigate();
    const user = useUser();
    useEffect(() => {
        if (user.emailVerified) {
            navigate('/');
        }
    }, [user, navigate]);
    const refresh = async () => {
        console.log('refresh');
        axios.post(`${BACKEND_URL}/verification`, {}, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    const throttledRefresh = useCallback(_.throttle(() => { refresh(); }, 60000), []);
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10rem',
        }}>
            <Typography variant='h2'>Need Email Verification</Typography>
            <Typography sx={{ mr: '2rem', ml: '2rem', textAlign: 'center' }}>
                Please verify your email address by clicking the link in the email
                we sent you. <br />
                If you did not receive an email, please check your spam folder or{' '}
                <Button
                    onClick={async () => {
                        throttledRefresh();
                    }}>
                    click here
                </Button>{' '}
                to send another email. You can only send one email every minute.
            </Typography>
        </div>
    );
};

export default NeedEmailVerification;
