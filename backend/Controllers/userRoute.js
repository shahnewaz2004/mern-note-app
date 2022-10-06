const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../Model/user');
const {registerValidate, passwordValidate} = require('../Helper/validation');
const jwtToken = require('../Helper/token');
const authorization = require('../Middleware/authorization');

router.get('/', authorization, async(req, res) => {
    try {
        const id = req.body.id;
        const user = await User.findById(id);
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

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

// Login user 
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


// Change password 
router.put('/changepassword', authorization, async (req, res) => {
    try {
        const user = await User.findById(req.body.id);

         const validPassword = await bcrypt.compare(req.body.Password, user.Password);
         if(!validPassword) return res.status(400).send('Password is incorrect');
 
         const {error} = passwordValidate({'New password': req.body.NewPassword});
         if(error) return res.status(400).send(error.details[0].message);
         
         const hash = await bcrypt.hash(req.body.NewPassword, 10);
         user.Password = hash;
         await user.save();
 
         res.send('Password changed');
    } catch (error) {
        res.status(500).send('Internal server error')
    }
})


// Logout 
router.get('/logout', authorization, async (req, res) =>{
    try {
        res.clearCookie('notelab_id').send('Logged out');
    } catch (error) {
        res.status(500).send('Internal server error')
    }
})

module.exports = router;