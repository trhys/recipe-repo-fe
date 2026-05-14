import { useState } from 'react'
import { Outlet } from 'react-router'
import { useAuth } from './components/auth.jsx'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import './App.css'

function App() {
	const { user, logout } = useAuth();

  return (
    <>
	<Navbar/>

      	<section id="center">
	<Outlet />
	</section>

      <section id="next-steps">

	  </section>
      <section id="spacer">
		<Footer />
	  </section>
    </>
  )
}

export default App
