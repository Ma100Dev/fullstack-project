const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');
const { decrypt, getPrivateKey } = require('../utils/cryptography');

loginRouter.post('/', async (request, response) => {
    const { body } = request;
    const user = await User.findOne({ username: body.username });
    const p = {
        v: 'hybrid-crypto-js_0.2.4',
        iv: 'LrrXjJLnCRlEU+JnFLKkk0kuwKU95onhTYwEG4pgp34=',
        keys: {
            'cc:08:48:28:c4:39:51:02:e7:54:23:80:32:81:7c:43:33:97:ad:43': 'KYJp4ch6NnuyM/5kPbUCx876VHTAC0Jhi1xefHT61Xj13s1st/1yFeFOuEiFxJbxHV79b7Wzkqef8O3Q0aUapVrXD/ZjaGkWXccpWTt1s2i+qVOxh4tmZWqMzXnCWbzUupar3uQEHwQSBdR61rCS1XS2xUhpQ2+EZFhH4Yp4HpCtX1zybA3wFw5NteNbEQ+ugJ22QjQt/4rv8kj27N6xRTLNuPZQ/0hU3FdGVnaH2qeDcQ5x59YpAbWyXA1/ZHnn0Y+NXVywEdnJP+Q4y0lSHNSlscBYevgcgNF8TzppG27x2VqnNYsEN0GwPg4jCyiJKfSbq4hMBL/NaStMe0g83iPn3GVXWQO1i8D5DzNtloL36RIhfsoXC8tv7wpYP6YIOUwl/8m3H87IVz7gW4DCSrXZwniUEP5ruo1RWVz0sjbswxNwF74Zuu1WKb3yrrFlV3vK/SaG0Q8SO6lQkfksFCZVHZrlX3qyAfxQZD4/yb2bntiXaylMOq5h+ImiZOy8T1f6MSMYuSVfBHFIBl1VVcyplLRNTXt2B72r9jryLtGzi83/gB+phuCWKIxUi+hGNAhcY+KuJuD3D6SUD5K0wwrNBAKLiQglonpsxLS3MXmKznOmag4e96jjjUykMoXuhndI5r1g2VvlEY9wL/L7tTsDVrn0xZjIJHBYtNwYhig=',
        },
        cipher: 'taFtMLpPIMl0/L5jk+7mXA==',
    };
    console.log(p);
    console.log(Object.prototype.hasOwnProperty.call(p, 'v') && Object.prototype.hasOwnProperty.call(p, 'iv') && Object.prototype.hasOwnProperty.call(p, 'keys') && Object.prototype.hasOwnProperty.call(p, 'cipher'))
    const password = decrypt(
      getPrivateKey(),
      p,
    ).message;
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
          error: 'invalid username or password',
      });
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    const token = jwt.sign(userForToken, config.JWT_SECRET);
    response
      .status(200)
      .send({ token, id: user.toJSON().id });
});

// TODO: Server-side session management

module.exports = loginRouter;
