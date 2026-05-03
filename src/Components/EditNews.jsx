import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useNews } from '../Contexts/NewsProvider'

const EditNews = () => {
  const navigate = useNavigate()

    const {editNews, setOpen, setEditing, newz, setNewz} = useNews()

    const [form, setForm] = useState({
        id: "",
        title: "",
        description: "",
        content: "",
        author: "",
        urlToImage: "",
        url: "",
    });

useEffect(() => {
  if (newz) {
    setForm({
        id: newz.id || "",
      title: newz.title || "",
      description: newz.description || "",
      content: newz.content || "",
      author: newz.author || "",
      urlToImage: newz.urlToImage || "",
      url: newz.url || "",
    });
  }
}, [newz]);


    const handleChange = (e) => {
        const {name, value} = e.target
        setForm((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.author?.trim() ||
            !form.content?.trim() ||
            !form.description?.trim() ||
            !form.title?.trim() ||
            !form.url?.trim() ||
            !form.urlToImage?.trim()) return;
        editNews(form)

        setEditing(false)
        navigate(-1)
    }
  return (
    <div className=' flex flex-col fixed z-50 inset-0 bg-white items-center justify-center w-screen'>
        <div className=' bg-blue-200 p-4 rounded-xl shadow-lg flex items-center justify-center lg:w-175 md:w-125'>
        <form action='submit'  
            onSubmit=  {handleSubmit}
            className=' flex flex-col gap-4'
            >
             <label className=' -mb-3'>Title:</label>   
            <input 
            name='title'
            type="text" 
            value={form.title}
            placeholder='Title'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded lg:w-150 md:w-100 bg-white'
            />

            <label className=' -mb-3'>Description:</label>   
            <input 
            name='description'
            type="text" 
            value={form.description}
            placeholder='Description'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded bg-white'
            />

            <label className=' -mb-3'>Content:</label>   
            <input 
            name='content'
            type="text" 
            value={form.content}
            placeholder='Content'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded bg-white'
            />

            <label className=' -mb-3'>Author:</label>   
            <input 
            name='author'
            type="text" 
            value={form.author}
            placeholder='Author'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded bg-white'
            />

            <label className=' -mb-3'>Image url:</label>   
            <input 
            name='urlToImage'
            type="text" 
            value={form.urlToImage}
            placeholder='Image Url'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded bg-white'
            />

            <label className=' -mb-3'>Article url:</label>   
            <input 
            name='url'
            type="text" 
            value={form.url}
            placeholder='News Url'
            onChange={handleChange}
            className=' flex-1 outline-none border-2 border-black p-2 rounded bg-white'
            />

            <div className=' flex gap-4 justify-center'>

                <button type='button' className=' bg-red-400 px-2 py-1 rounded hover:bg-rose-500 transition-color w-fit cursor-pointer' onClick={() => setEditing(false)}>
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

export default EditNews