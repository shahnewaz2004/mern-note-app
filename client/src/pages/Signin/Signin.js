import React, {useState, useContext} from 'react';
import { Authcontext } from '../../Context/Authcontext';
import {HiLockClosed} from 'react-icons/hi';
import {MdEmail} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {

    const {setUser} = useContext(Authcontext);
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        success: '',
        error: '', 
        loading: false
    })

    const [data, setData] = useState({
        Email: '',
        Password: ''
    })

    const handleChange = e =>{
        setData({...data, [e.target.name] : e.target.value})
    }

    const submit = e => {
        e.preventDefault();
        setInfo({...info, loading: true});

        if(!data.Email || !data.Password){
            setInfo({...info, error: 'Feilds are required.'})
        }else{

            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_CLIENT_URL}/api/user/login`,
                headers: {
                    'Content-type' : 'Application/json'
                },
                withCredentials: true,
                data: data
            }).then(res => {
                setUser(res.data);
                setInfo({loading: false, error: '', success: 'Logged in. Redirecting to dashboard'});
                setTimeout(() => navigate('/dashboard'), 1000);

            }).catch(err => {
                setInfo({loading: false, error: err.response.data, success: ''});
            })
        }
    }

  return (
      <div className='flex justify-center items-center min-h-[80vh]'>
        <form onSubmit={submit} className='border border-gray-300 rounded p-16 w-[500px]'>
            <div className='mb-6'>
                <h3 className={styles.welcome}>Welcome <span className='text-blue'>back!</span></h3>
                <p className='font-Averta font-semibold text-[#969696]'>Login to continue</p>
            </div>

                {
                    info.error ? <div className={styles.error}>{info.error}</div> : ''
                }

                {
                    info.success ? <div className={styles.success}>{info.success}</div> : ''
                }

            <div className={styles.inputContainer}>
                <MdEmail className={styles.icon} />
                <input onChange={handleChange} className={styles.input} type="email" name='Email' placeholder='Email'/>
            </div>

            <div className={styles.inputContainer}>
                <HiLockClosed className={styles.icon} />
                <input onChange={handleChange} className={styles.input} type="password" name='Password' placeholder='Password'/>
            </div>

            <div className={styles.buttons}>
                <button disabled={info.loading} className={`${styles.button} bg-blue text-white`}>
                    {info.loading ? 'Loading...' : 'Login'}
                </button>
                <button className={`${styles.button} bg-transparent text-gray-500`}>
                    Forget password?
                </button>
            </div>

            <div className='text-gray-500 font-Averta font-semibold mt-8'>
                New user? <Link to='/signup' className='text-blue/80 underline'>Create account</Link>
            </div>
        </form>
    </div>
  )
} 


const styles = {
    welcome: 'font-Poppin uppercase text-dark font-[700] text-2xl',
    inputContainer: 'relative mb-6',
    input: 'border rounded-sm w-full py-3 pl-12 pr-3 outline-none focus:border-blue',
    icon: 'absolute top-[50%] translate-y-[-50%] left-3 text-gray-500',
    buttons: 'flex mt-10',
    button: 'text-[15px] font-Poppin py-3 cursor-pointer flex-1 rounded-full disabled:cursor-not-allowed disabled:bg-blue/70',
    error: 'w-full py-3 mb-3 text-center px-2 bg-[#F5D5DB] text-[#721c24]',
    success: 'w-full py-3 mb-3 text-center px-2 bg-[#c3e6cb] text-[#155724]',
}


export default Signin