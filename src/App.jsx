import { useState } from 'react'
import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/navbar.jsx'
import { useAuth } from './components/auth.jsx'

function App() {
	const { user, logout } = useAuth();

  return (
    <>
	<Navbar/>

      	<section id="center">
	<Outlet />
	</section>

      <section id="next-steps"></section>
      <section id="spacer"></section>
    </>
  )
}

export default App
