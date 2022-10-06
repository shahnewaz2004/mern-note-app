import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';
import Logo from '../img/logo.png';

function Navbar() {
  const {isLoggedin, setLogin} = useContext(Authcontext);
  const navigate = useNavigate();

  const logout = function(){
    axios.get(`${process.env.REACT_APP_CLIENT_URL}/api/user/logout`, {
      withCredentials: true
    }).then(res => {
      setLogin(false);
      navigate('/');
    }).catch(err => {
      alert(err.response.data)
    })
  }

  return (
    <div className="container mx-auto">
        <div className='flex items-center justify-between'>
            <img src={Logo} alt="Logo" className='w-[150px]' />
            <div className='font-Poppin text-dark font-semibold'>
              {
                isLoggedin ? 
                <button onClick={logout} className='bg-blue text-white px-3 py-2 rounded'>Logout</button> 
                : 'About'
              }
            </div>
        </div>
    </div>
  )
}

export default Navbar