require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../Model/user')

/*This middleware will check if the user valid and the user has right
permission to request something (like update, delete etc..) */

async function authrization(req, res, next){
    try{

       const token = req.cookies;
       if(!token.notelab_id) return res.status(400).send('Access denied. Try again!');
 
      // If there will be any error in jwt verification, it will send the error on Catch block 
       const decode = await jwt.verify(token.notelab_id, process.env.Notelab_secret_key);
        

       const user = await User.findById(decode._id);
       if(!user) return res.status(400).send('Access denied. Try again!')

      // Assigning a new propery id on req body 
       req.body.id = decode._id; 
       next();
    }catch(err){
        return res.status(400).send('Access denied. Try again!')
    }
}

module.exports = authrization;