import React, {useState} from 'react';
import {FaTimes} from 'react-icons/fa';
import {toast} from 'react-toastify';
import axios from 'axios';


function Modal({setShow, load, title, description, heading, button, noteId}) {

    const [data, setData] = useState({
        Title: title,
        Description: description
    })

    const addNote = function(){

        axios({
            method: `${noteId ? 'PUT' : "POST" }`,
            url: `${process.env.REACT_APP_CLIENT_URL}${noteId ? `/api/note/edit/${noteId}` : '/api/note/add'}`,
            withCredentials: true, 
            headers: {
                'Content-type' : 'Application/json'
            },
            data: data
        }).then(res => {
            load();
            setShow(false);
            toast.success(res.data);
            for(let key in data){
                data[key] = '';
            }
        }).catch(err => {
            toast.error(err.response.data)
        })
    }


  return (
    <>
        <div className='z-40 bg-white shadow fixed py-8 border w-[500px] rounded top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex px-8 border-b pb-4 items-center justify-between text-dark'>
                <h4 className='font-Averta text-2xl font-semibold'>{heading}</h4>
                <FaTimes onClick={() => setShow(false)} className='text-gray-400 cursor-pointer' />
            </div>

            <div className='px-8 mt-7 space-y-5'>
                <div>
                    <p className={styles.hint}>Title</p>
                    <input value={data.Title} onChange={(e) => setData({...data, Title: e.target.value})} type="text" className={styles.input} />
                </div>
                <div>
                    <p className={styles.hint}>Description</p>
                    <textarea value={data.Description} onChange={(e) => setData({...data, Description: e.target.value})} className={`${styles.input} h-[200px] resize-none`}></textarea>
                </div>

                <button onClick={addNote} className={styles.button}>{button}</button>
            </div> 
        </div>
        <div className='h-full w-full bg-dark/20 fixed top-0 left-0'></div>
    </>
  )
}

const styles = {
    input: 'border rounded-sm w-full p-3 outline-none focus:border-blue',
    hint: 'font-Poppin text-dark mb-2',
    button: 'text-[15px] font-Poppin py-3 w-full rounded bg-blue text-white'
}


export default Modal