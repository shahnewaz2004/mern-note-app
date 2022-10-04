import React, {useState} from 'react';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {MdOutlineEdit, MdDelete} from 'react-icons/md';

function Note() {

    const [showPanel, setShow] = useState(false);

  return (
    <div className='border relative rounded h-[250px] w-[300px] p-5'>
        <div className='border-b pb-4'>
            <h3 className='font-Poppin font-semibold text-dark text-xl'>Note title</h3>
            <p className='font-Poppin text-dark/70 mt-3 text-[14px] tracking-wide leading-relaxed'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labo, Lorem ipsum dolor, sit amet cetur adipisicing elit Labo, Lorem ipsum dolor...
            </p>
        </div>
        <div className='flex justify-between items-center pt-3'>
            <p className='font-Averta text-gray-500 text-sm'>12 Aug, 2022</p>
            <BiDotsHorizontalRounded onClick={() => setShow(!showPanel)} className='text-blue/60 cursor-pointer text-xl' />
        </div>

        <div className={`${styles.editPanel} ${showPanel ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <button className={styles.button}><MdOutlineEdit className='mr-2' /> Edit</button>
            <button className={styles.button}><MdDelete className='mr-2' /> Delete</button>
        </div>
    </div>
  )
}

const styles ={
    button: 'flex items-center text-dark font-Poppin text-sm ',
    editPanel: 'w-[100px] space-y-3 border rounded-sm transition flex flex-col px-3 py-2 bg-white absolute right-12 bottom-3 shadow'
}

export default Note