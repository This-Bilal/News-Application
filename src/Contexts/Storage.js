const KEY = 'news'

export const saveNews = (news) => {
    localStorage.setItem(KEY, JSON.stringify(news))
}

export const getNews = () => {
    const data = localStorage.getItem(KEY)
    const result = data ? JSON.parse(data) : []
    return result
}
