import React, { useEffect } from 'react'
import { useNews } from '../Contexts/NewsProvider'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from './Modal'
import EditNews from './EditNews'

const EachNews = () => {

  const {newz, news, setLoading, loading, setNewz, editNews, deleteNews, open, setOpen, editing, setEditing} = useNews()
  const {id} = useParams()
  const navigate = useNavigate()

  const selectedNews = news.find(
  item => item.id === id
  )

  useEffect(() => {
  if (selectedNews) {
    setNewz(selectedNews)
  }
}, [selectedNews])

  if (loading) return <div>Loading News...</div>

  if (!news || news.length === 0) return (
      <div>No news found, go back and reload</div>
    )

  if (!newz) return <div>News not found.</div>
  return (
    <div className=' flex flex-col items-center my-10 break-all sm:px-3 w-screen'>
      <button onClick={() => navigate(-1)} className=' bg-blue-400 px-2 py-1 rounded hover:bg-blue-200 transition-color w-fit mb-4 cursor-pointer'>
        Back to news list
      </button>
      
      <div className=' flex flex-col p-3 rounded-xl bg-blue-300 lg:w-175 md:w-125 items-center align-middle justify-center text-justify gap-3'>
        {newz.title && <p className=' bg-white  py-2 px-1.5 rounded-lg font-semibold'>{newz.title}</p>}
        <div className=' text-justify bg-white rounded-lg p-4'>
        {newz.description && <p><strong>Description: </strong>{newz.description}</p>}
        <br />

        {newz.content && <p><strong>Content: </strong>{newz.content}</p>}
        <br />

        {newz.author && <p><strong>Author: </strong><em>{newz.author}</em></p>}
        <br />

        {newz.urlToImage && <p><img className=' rounded' src={newz.urlToImage} alt="Image"/></p>}
        <br />

        {newz.url && <p><strong>Read full: </strong><em><a href={newz.url} className=' text-blue-500 hover:text-blue-700 cursor-pointer'>{newz.url}</a></em></p>}
        <br/>

        {newz.publishedAt && <p><strong>Date Published: </strong><em>{newz.publishedAt}</em></p>}
        </div>
      </div>
      <div className=' flex gap-10 mt-4'>
        <button className=' bg-green-400 px-2 py1 rounded hover:bg-green-600 transition-color w-fit mb-4 cursor-pointer' onClick={() => setEditing(true)}>
          Edit
        </button>

        <button className=' bg-red-400 px-2 py-1 rounded hover:bg-rose-500 transition-color w-fit mb-4 cursor-pointer' onClick={() => setOpen(true)}>
          Delete
        </button>
        {
          open && <Modal/>
        }

        {
          editing && <EditNews/>
        }
      </div>
    </div>
  )
}

export default EachNews