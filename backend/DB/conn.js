const mongoose = require('mongoose');

mongoose.connect(process.env.Notelab_conn_str, err => {
    if(err){
        console.log('Database connection error', err.message);
    }else{
        console.log('Database connected');
    } 
})