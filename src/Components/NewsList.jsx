import React from 'react'
import { useNews } from '../Contexts/NewsProvider'
import { Link } from 'react-router-dom'
import NewsForm from './NewsForm'


const NewsList = () => {
    const {loading, news, setOpen, open, allNews, search, setSearch} = useNews()

  return (
    <div>
        <div className=' flex gap-10 ml-4 mt-5'>
            <button onClick={() => setOpen(true)} className=' bg-blue-400 px-2 py-1 rounded hover:bg-blue-300 cursor-pointer'>
                Add news
            </button>
            {
                open && <NewsForm/>
            }

            <input 
            type="text"
            value={search}
            placeholder='Search by title or author...'
            onChange={(e) => setSearch(e.target.value)}
            className=' border p-2 outline-none rounded-lg'
            />
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-7'>
        {loading && <p>Loading...</p>}

        {!loading && news.length === 0 && <p>No News found</p>}
        
        {allNews.map((newz) => (
            <div key={newz.id} className=' bg-blue-200 rounded-xl p-5 text-justify hover:shadow-lg hover:bg-blue-300 transition-all flex flex-col justify-evenly hover:-translate-y-0.5 cursor-pointer'>
                {newz.title && <p><strong>Title:</strong> {newz.title}</p>}
                <div className=' bg-white rounded-xl p-2'>
                    {newz.description && <p><strong>Description: </strong>{newz.description}</p>}
                    {newz.author && <p><strong>Author:</strong> <em>{newz.author}</em></p>}
                </div>
                <Link to={`/eachNewz/${newz.id}`} className=' bg-blue-400 px-1 rounded hover:bg-blue-200 transition-color w-fit mt-1 '>
                    Read
                </Link>
            </div>
        ))}
    </div>
    </div>
  )
}

export default NewsList