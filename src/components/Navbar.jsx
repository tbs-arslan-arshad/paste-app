import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex gap-4 p-4 bg-gray-800 text-white rounded-md'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/pastes">Pastes</NavLink>
        </div>
  )
}

export default Navbar