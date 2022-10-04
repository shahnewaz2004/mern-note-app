import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import {Authcontext} from './Context/Authcontext';

import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './Components/Navbar';
import Notfound from './Components/Notfound';

function App() {

  const [user, setUser] = useState({});

  return (
    <>
    <Authcontext.Provider value={{user, setUser}}>
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
