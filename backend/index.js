require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;

require('./DB/conn.js');
const userRoute = require('./Controllers/userRoute');

 
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/user', userRoute);





app.listen(port, () => {
    console.log(`You are listening to the port ${port}`);
})