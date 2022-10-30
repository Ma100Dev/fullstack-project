import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../utils/config';

// Is this optimal? I have no idea.
const useCrypt = () => {
    const [publicKey, setPublicKey] = useState(null);
    axios.get(`${BACKEND_URL}/crypto`).then((response) => {
        setPublicKey(response.data);
    });
    const crypt = new window.Crypt();
    return [crypt, publicKey];
};

export default useCrypt;