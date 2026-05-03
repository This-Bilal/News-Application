import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NewsProvider from './Contexts/NewsProvider.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <NewsProvider>
      <BrowserRouter>
    <App />
      </BrowserRouter>
    </NewsProvider>

  </StrictMode>,
)
