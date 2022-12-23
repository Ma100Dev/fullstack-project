import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useUser = (noRedirect) => {
    const navigate = useNavigate();
    let localUser = useSelector(state => state.user);
    if (!localUser) {
        localUser = {};
    }
    if (!localUser.verified) {
        navigate('/verify', { replace: true });
    }
    useEffect(() => {
        if (Object.keys(localUser).length === 0 && !noRedirect) {
            navigate('/login');
        }
    }, [localUser, navigate, noRedirect]);
    return localUser;   
};

export default useUser;
