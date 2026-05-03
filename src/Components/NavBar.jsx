import React from 'react'
import { Link } from 'react-router'

const NavBar = () => {
  return (
    <nav className=' bg-blue-500 p-6 flex justify-between'>
        <h2 className=' font-bold text-2xl'>Get your latest update</h2>
        <Link to={'/'}>
            Home
        </Link>
        
    </nav>
  )
}

export default NavBar