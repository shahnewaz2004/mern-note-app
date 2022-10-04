import React from 'react';
import Logo from '../img/logo.png';

function Navbar() {
  return (
    <div className="container mx-auto">
        <div className='flex items-center justify-between'>
            <img src={Logo} alt="Logo" className='w-[150px]' />
            <div className='font-Poppin text-dark font-semibold'>
                About
            </div>
        </div>
    </div>
  )
}

export default Navbar