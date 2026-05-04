import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getNews, saveNews } from './Storage'
import { articles } from './articles'

const NewsContext = createContext()

const NewsProvider = ({children}) => {

    const [news, setNews] = useState(() => getNews() || []) 

    useEffect(() => {
        const stored = getNews()

        if (!stored || stored.length === 0) {
            setNews(articles)
    }
}, [])

    const [newz, setNewz] = useState({
        author: '',
        content: '',
        description: '',
        title: '',
        url: '',
        urlToImage: ''
    })

    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const [deleted, setDeleted] = useState(null)
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)
    const title = 'Are you sure?'

    useEffect(() => {
        console.log(news);
    }, [news])

    const addNews = (newz) => {
        setNews((prev) => [
            ...prev,
            {
                id: Date.now(),
                author: newz.author,
                content: newz.content,
                description: newz.description,
                publishedAt: newz.publishedAt,
                title: newz.title,
                articleUrl: newz.articleUrl,
                imageUrl: newz.imageUrl
            }
        ])
    }


    const editNews = (updatedNews) => {
        setNews((prev) => prev.map((newz) => newz.id === updatedNews.id ? {...newz, ...updatedNews} : newz))
    }

    const deleteNews = (id) => {
            setNews((prev) =>
    prev.filter((newz) => newz.id !== id)
  )
}

    useEffect(() => {
        saveNews(news)
    }, [news])

    const [search, setSearch] = useState('')

    const allNews = news.filter((item) => {
        const matchesSearch = item.title?.toLowerCase().includes(search.toLowerCase()) || item.author?.toLowerCase().includes(search.toLowerCase())

    return matchesSearch 
})

  return (
    <NewsContext.Provider value={{news, setNews, newz, setNewz, loading, editing, setEditing, deleted, setDeleted, addNews, editNews, deleteNews, error, title, open, setOpen, allNews, search, setSearch}}>{children}</NewsContext.Provider>
  )
}

export const useNews = () => {
    return useContext(NewsContext)
} 

export default NewsProvider