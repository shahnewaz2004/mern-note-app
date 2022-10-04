require('dotenv').config();
const jwt = require('jsonwebtoken');
const _ = require('lodash');

function jwtToken(user){
    return jwt.sign(_.pick(user, ['_id', 'Name']), process.env.Notelab_secret_key)
}

module.exports = jwtToken;