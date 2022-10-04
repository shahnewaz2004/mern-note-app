const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../Model/user');
const {registerValidate} = require('../Helper/validation');
const jwtToken = require('../Helper/token');

// CREATE USER 
router.post('/register', async (req, res) => {
    try {
        const {error} = registerValidate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        const checkEmail = await User.findOne({Email: req.body.Email});

        if(checkEmail) return res.status(400).send('Email is already registered');

        const hash = await bcrypt.hash(req.body.Password, 10);
        req.body.Password = hash;
        const user = new User(req.body);
        await user.save();

        const token = jwtToken(user);

        res.cookie('notelab_id', token, {
            sameSite: 'none',
            path: '/',
            httpOnly: true,
            secure: true,
        }).send(user);

    } catch (error) {
        res.status(500).send('Internal server error');
    }
})


router.post('/login', async (req, res) => {
    try {
        const {Email, Password} = req.body;
        const user = await User.findOne({Email});

        if(!user) return res.status(400).send('Email or is invalid');
        const validPassword = await bcrypt.compare(Password, user.Password);

        if(!validPassword) return res.status(400).send('Email or password is invalid');

        const token = jwtToken(user);
        res.cookie('notelab_id', token, {
            sameSite: 'none',
            path: '/',
            httpOnly: true,
            secure: true,
        }).send(user);

    } catch (error) {
        
    }
})

module.exports = router;