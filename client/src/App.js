import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {Authcontext} from './context/Authcontext'
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './Components/Navbar';
import Notfound from './Components/Notfound';
import axios from 'axios';

function App() {

  const [isLoggedin, setLogin] = useState(false);

  useEffect(function(){
    axios.get(`${process.env.REACT_APP_CLIENT_URL}/api/user/`, {
        withCredentials: true
    }).then(res => {
      setLogin(true);
    }).catch(err => {
        console.log('Login first')
    })
  }, [])

  return (
    <>
    <Authcontext.Provider value={{isLoggedin, setLogin}}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Signin />} /> 
        <Route path='/signup' element={<Signup />} /> 
        <Route path='/dashboard' element={<Dashboard />} /> 
        <Route path='*' element={<Notfound />} />
      </Routes>
    </Authcontext.Provider>
    </>
  );
}

export default App;
