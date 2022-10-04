import React, {useState, useContext} from 'react';
import {Authcontext} from '../../Context/Authcontext';
import Modal from '../../Components/Modal';
import Note from '../../Components/Note';
import {IoIosAddCircleOutline} from 'react-icons/io';


function Dashboard() {

    const [showModal, setShow] = useState(false);
    const {user} = useContext(Authcontext);


  return (
    <div className='container justify-center mx-auto py-10 flex'>
        
        <div className='flex flex-wrap gap-x-5 gap-y-7 w-[70%]'>
            <div onClick={() => setShow(true)} className='border rounded cursor-pointer h-[250px] w-[300px] flex items-center justify-center hover:shadow transition'>
                <div>
                    <IoIosAddCircleOutline size={70} className='text-blue/80 block mx-auto' />
                    <p className='font-Poppin text-blue/80'>Add new note</p>
                </div>
            </div>
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
        </div>

        <div className='w-[20%] h-max space-y-1 sticky top-10'>
            <h3 className='text-2xl font-Averta font-semibold text-dark'> 
             <span className='text-blue'>Hi,</span> {user.Name}
            </h3>
            <p className='font-Averta text-gray-500'>ID: {user.uId}</p>
            <p className='font-Averta text-gray-500'>Email: {user.Email}</p>

            <div className='pt-10'>
                <h4 className='font-Poppin font-semibold text-dark mb-2'>Email change</h4>
                <div>
                  <input className={styles.input} type="email" placeholder='New email'/>
                </div>
                <div>
                  <input className={styles.input} type="password" placeholder='Current password' />
                </div>
                <button className={styles.button}>Update</button>
            </div>

            <div className='pt-10'>
                <h4 className='font-Poppin font-semibold text-dark mb-2'>Password change</h4>
                <div>
                  <input className={styles.input} type="password" placeholder='Current password'/>
                </div>
                <div>
                  <input className={styles.input} type="password" placeholder='New password' />
                </div>
                <button className={styles.button}>Update</button>
            </div>
        </div>


        {
            showModal ? <Modal setShow={setShow} /> : ''
        }
      
    </div>
  )
}

const styles = {
    input: 'border rounded-sm w-full mb-3 p-2 outline-none focus:border-blue',
    button: 'text-[15px] font-Poppin py-2 w-full bg-[#1abc9c] text-white rounded'
}

export default Dashboard