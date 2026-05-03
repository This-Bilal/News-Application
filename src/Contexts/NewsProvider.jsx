import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getNews, saveNews } from './Storage'

const NewsContext = createContext()

const NewsProvider = ({children}) => {

    const [news, setNews] = useState(() => getNews() || []) 

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

        if (news.length > 0) return;

        const fetchNews = async () => {
            setLoading(true)

            try {
                const response = await axios.get('https://newsapi.org/v2/everything?q=apple&from=2026-04-30&to=2026-04-30&sortBy=popularity&apiKey=2e32e1f4f12145bb9e238b0cc178a537')

                if (response?.data?.articles) {
                    setNews(
                        response.data.articles.map((newz) => ({
                            id: crypto.randomUUID(),
                            ...newz
                        }))
                        
                    )
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch News')
            } finally{
                setLoading(false)
            }
        }
        fetchNews()
    }, [])

    useEffect(() => {
        console.log(news);
    }, [news])

    const addNews = (newz) => {
        setNews((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                author: newz.author,
                content: newz.content,
                description: newz.description,
                publishedAt: newz.publishedAt,
                title: newz.title,
                url: newz.url,
                urlToImage: newz.urlToImage
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