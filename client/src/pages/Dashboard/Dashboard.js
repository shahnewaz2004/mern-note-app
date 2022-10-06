import React, {useState, useEffect, useContext} from 'react';
import Modal from '../../Components/Modal';
import Note from '../../Components/Note';
import { Authcontext } from '../../context/Authcontext';
import {IoIosAddCircleOutline} from 'react-icons/io';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Dashboard() {

    const {setLogin} = useContext(Authcontext);
    const navigate = useNavigate();
    const [user, setuser] = useState({});
    const [data, setData] = useState({Password: '', NewPassword: ''});
    const [showModal, setShow] = useState(false);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
      fetchNote();
      fetchUser();
    }, [])

    const fetchNote = function(){
      axios.get(`${process.env.REACT_APP_CLIENT_URL}/api/note/`, {
        withCredentials: true, 
      }).then(res => {
        setNotes(res.data);
      }).catch(err => {
        toast.error(err.response.data);
      })
    }

    const fetchUser = function(){
      axios.get(`${process.env.REACT_APP_CLIENT_URL}/api/user/`, {
          withCredentials: true
      }).then(res => {
         setuser(res.data);
         setLogin(true);
      }).catch(err => {
          navigate('/');
      })
    }

    const changePassword = () => {
      axios({
        method: 'PUT',
        withCredentials: true, 
        url: `${process.env.REACT_APP_CLIENT_URL}/api/user/changepassword`,
        headers: {
          'Content-type' : 'Application/json'
        },
        data
      }).then(res => {
        toast.success(res.data);
        setData({Password:'', NewPassword: ''})
      }).catch(err => {
         toast.error(err.response.data);
      })
    }

  return (
    <div className='container justify-center mx-auto py-10 flex'>
        
        <div className='flex flex-wrap gap-x-5 gap-y-7 w-[70%]'>
            <div onClick={() => setShow(true)} className='border rounded cursor-pointer h-[250px] w-[300px] flex items-center justify-center hover:shadow transition'>
                <div>
                    <IoIosAddCircleOutline size={70} className='text-blue/80 block mx-auto' />
                    <p className='font-Poppin text-blue/80'>Add new note</p>
                </div>
            </div>
            {
              notes && notes.map((value, index) => {
                return <Note load={fetchNote} key={index} note={value}/>
              })
            }
            
           
        </div>

        <div className='w-[20%] h-max space-y-1 sticky top-10'>
            <h3 className='text-2xl font-Averta font-semibold text-dark'> 
             <span className='text-blue'>Hi,</span> {user.Name} 
            </h3>
            <p className='font-Averta text-gray-500'>ID: {user.uId}</p>
            <p className='font-Averta text-gray-500'>Email: {user.Email}</p>

            <div className='pt-10'>
                <h4 className='font-Poppin font-semibold text-dark mb-2'>Password change</h4>
                <div>
                  <input value={data.Password} onChange={(e) => setData({...data, Password: e.target.value})} className={styles.input} type="password" placeholder='Current password'/>
                </div>
                <div>
                  <input value={data.NewPassword} onChange={(e) => setData({...data, NewPassword: e.target.value})} className={styles.input} type="password" placeholder='New password' />
                </div>
                <button onClick={changePassword} className={styles.button}>Update</button>
            </div>
        </div>


        {
            showModal ? 
            (
              <Modal heading='Add new note' button="Add" load={fetchNote} setShow={setShow} title='' description='' noteId='' />
            )
            : 
            ''
        }
      
    </div>
  )
}

const styles = {
    input: 'border rounded-sm w-full mb-3 p-2 outline-none focus:border-blue',
    button: 'text-[15px] font-Poppin py-2 w-full bg-[#1abc9c] text-white rounded'
}

export default Dashboard