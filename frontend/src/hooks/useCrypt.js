import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@utils/config';
import { useDispatch } from 'react-redux';
import { addError } from '@reducers/errorReducer';

// Is this optimal? I have no idea.

// TODO: Add public key to Redux store.
const useCrypt = () => {
    const dispatch = useDispatch();
    const [publicKey, setPublicKey] = useState(null);
    axios.get(`${BACKEND_URL}/crypto`).then((response) => {
        setPublicKey(response.data);
    }).catch((error) => {
        dispatch(addError({ msg: error.message, title: 'Error connecting to server' }));
    });
    const crypt = new window.Crypt();
    return [crypt, publicKey];
};

export default useCrypt;
