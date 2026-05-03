import React from 'react'
import { useNews } from '../Contexts/NewsProvider'
import { useNavigate, useParams } from 'react-router-dom'

const Modal = ({children}) => {
    const {title, deleteNews, setOpen, newz} = useNews()
    const navigate = useNavigate()
  return (
    <div className=' flex flex-col gap-4 items-center inset-0 bg-black/50 justify-center p-5 rounded fixed z-50'>
        <div className=' flex bg-white rounded flex-col p-4 items-center gap-5'>
            <h2>{title}</h2>
            <div className=' flex gap-3'>
                <button className=' bg-green-400 px-2 py1 rounded hover:bg-green-600 transition-color w-fit cursor-pointer' onClick={() => setOpen(false)}>
                    Cancel
            </button>

                <button className=' bg-red-400 px-2 py-1 rounded hover:bg-rose-500 transition-color w-fit cursor-pointer' onClick={() => {deleteNews((newz.id)); navigate(-1); setOpen(false)} }>
                    Confirm
                </button>
            </div>
        </div>
        {children}
    </div>
  )
}

export default Modal