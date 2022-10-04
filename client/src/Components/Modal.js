import React from 'react';
import {FaTimes} from 'react-icons/fa';


function Modal({setShow}) {
  return (
    <>
        <div className='z-40 bg-white shadow fixed py-8 border w-[500px] rounded top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex px-8 border-b pb-4 items-center justify-between text-dark'>
                <h4 className='font-Averta text-2xl font-semibold'>Add new note</h4>
                <FaTimes onClick={() => setShow(false)} className='text-gray-400 cursor-pointer' />
            </div>

            <div className='px-8 mt-7 space-y-5'>
                <div>
                    <p className={styles.hint}>Title</p>
                    <input type="text" className={styles.input} />
                </div>
                <div>
                    <p className={styles.hint}>Description</p>
                    <textarea className={`${styles.input} h-[200px] resize-none`}></textarea>
                </div>

                <button className={styles.button}>Add note</button>
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