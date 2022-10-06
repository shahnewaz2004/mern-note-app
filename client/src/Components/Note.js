import axios from 'axios';
import React, {useState} from 'react';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {MdOutlineEdit, MdDelete} from 'react-icons/md';
import { toast } from 'react-toastify';
import Modal from './Modal';

function Note({note, load}) {

    const {Title, Description, lastUpdate} = note;
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [noteId, setId] = useState('');
    const [showPanel, setShowPanel] = useState(false);
    const [showModal, setShow] = useState(false);

    const editNote = note => {
        setShow(true);
        setTitle(note.Title);
        setDesc(note.Description);
        setId(note._id);
    }

    const deleteNote = id => {
        axios.delete(`${process.env.REACT_APP_CLIENT_URL}/api/note/delete/${id}`, {
            withCredentials: true
        }).then(res => {
            toast.success(res.data);
            load();
        }).catch(err => {
            toast.error(err.response.data)
        })
    }

  return (
    <div className='border relative rounded h-[250px] w-[300px] p-5'>
        <div className='border-b pb-4 h-5/6'>
            <h3 className='font-Poppin font-semibold text-dark text-xl'>
                {
                    Title.length > 20 ?
                    (
                        `${Title.slice(0, 20)}...`
                    )
                    : Title
                }
            </h3>
            <p className='font-Poppin text-dark/70 mt-3 text-[14px] tracking-wide leading-relaxed'>
               {
                   Description.length > 150 ?
                   (
                       `${Description.slice(0, 150)}...`
                   )
                   : Description 
               }
            </p>
        </div>
        <div className='flex justify-between items-center pt-3'>
            <p className='font-Averta text-gray-500 text-sm'>{lastUpdate}</p>
            <BiDotsHorizontalRounded onClick={() => setShowPanel(!showPanel)} className='text-blue/60 cursor-pointer text-xl' />
        </div>

        <div className={`${styles.editPanel} ${showPanel ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <button onClick={() => editNote(note)} className={styles.button}><MdOutlineEdit className='mr-2' /> Edit</button>
            <button onClick={() => deleteNote(note._id)} className={styles.button}><MdDelete className='mr-2' /> Delete</button>
        </div>

        {
            showModal ? 
            (
                <Modal load={load} heading='Update note' button='Update' setShow={setShow} title={title} description={description} noteId={noteId} />
            )
            : 
            ''
        }
    </div>
  )
}

const styles ={
    button: 'flex items-center text-dark font-Poppin text-sm ',
    editPanel: 'w-[100px] space-y-3 border rounded-sm transition flex flex-col px-3 py-2 bg-white absolute right-12 bottom-3 shadow'
}

export default Note