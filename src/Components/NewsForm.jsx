import React, { useEffect, useState } from 'react'
import { useNews } from '../Contexts/NewsProvider'
import { useNavigate } from 'react-router-dom'

const NewsForm = () => {

    const navigate = useNavigate()

    const {addNews, setOpen} = useNews()

    const [newz, setNewz] = useState({
        author: '',
        content: '',
        description: '',
        title: '',
        imageUrl: '',
        articleUrl: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewz((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newz.author.trim() || !newz.content.trim() || !newz.description.trim() || !newz.title.trim() || !newz.imageUrl.trim() || !newz.articleUrl.trim()) return;

        addNews({
            id: Date.now(),
            ...newz, 
            publishedAt: new Date().toISOString()
        })
        setNewz({
            author: '',
            content: '',
            description: '',
            title: '',
            imageUrl: '',
            articleUrl: '',
        })
    }
  return (
    <div className=' flex flex-col fixed z-50 inset-0 bg-white items-center justify-center'>
        <button className='  cursor-pointer' onClick={() => setOpen(false)}>Back to Home</button>
        <h2 className=' font-bold text-4xl mb-4'>ADD NEWS</h2>
        <div className=' bg-blue-200 p-4 rounded-xl shadow-lg flex items-center justify-center lg:w-175 md:w-125'>
        <form 
            onSubmit=  {handleSubmit}
            className=' flex flex-col gap-4'
            >
            <input 
            name='title'
            type="text" 
            value={newz.title}
            placeholder='Title'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded lg:w-150 md:w-100 bg-white'
            />

            <input 
            name='description'
            type="text" 
            value={newz.description}
            placeholder='Description'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded bg-white'
            />

            <input 
            name='content'
            type="text" 
            value={newz.content}
            placeholder='Content'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded bg-white'
            />

            <input 
            name='author'
            type="text" 
            value={newz.author}
            placeholder='Author'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded bg-white'
            />

            <input 
            name='imageUrl'
            type="text" 
            value={newz.imageUrl}
            placeholder='Image Url'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded bg-white'
            />

            <input 
            name='articleUrl'
            type="text" 
            value={newz.articleUrl}
            placeholder='News Url'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded bg-white'
            />

            <div className=' flex gap-4 justify-center'>

                <button className=' bg-red-400 px-2 py-1 rounded hover:bg-rose-500 transition-color w-fit cursor-pointer' onClick={() => setOpen(false)}>
                    Cancel
                </button>

                <button type='submit' className=' bg-green-400 px-2 py-1 rounded hover:bg-green-600 transition-color w-fit cursor-pointer'>
                    Upload
                </button>

            </div>
        </form>
        </div>
    </div>
  )
}

export default NewsForm