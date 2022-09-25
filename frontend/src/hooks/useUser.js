import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useUser = () => {
    const navigate = useNavigate();
    let localUser = useSelector(state => state.user);
    if (!localUser) {
        localUser = {};
    }
    useEffect(() => {
        if (Object.keys(localUser).length === 0) {
            navigate('/login');
        }
    }, [localUser, navigate]);
    return localUser;   
};

export default useUser;