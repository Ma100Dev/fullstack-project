import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../utils/config';
import { Crypt } from 'hybrid-crypto.js';

// Is this optimal? I have no idea.
const useCrypt = () => {
    const [publicKey, setPublicKey] = useState(null);
    axios.get(`${BACKEND_URL}/crypto`).then((response) => {
        setPublicKey(response.data);
    });
    const crypt = new Crypt();
    if (!publicKey) {
        return [null, null];
    }
    return [crypt, publicKey];
};

export default useCrypt;