import React from 'react'
import NavBar from './Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import NewsList from './Components/NewsList'
import EachNews from './Components/EachNews'

const App = () => {
  return (
    <div>
      <NavBar/>
      <main>
        <Routes>
          <Route path='/' element={<NewsList/>}/>
          <Route path='/eachNewz/:id' element={<EachNews/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App