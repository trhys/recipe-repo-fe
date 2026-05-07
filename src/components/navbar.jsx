import { Link, NavLink } from 'react-router'
import logo from '../assets/logo.png'
import './navbar.css'

export default function Navbar() {
	return (
		<nav className="navbar">
		<Link to="/" className="logo-container">
			<img src={logo} className="logo-img" />
			<span className="logo-text">The Recipe Repo</span>
		</Link>
		<div className="nav-links">
			<NavLink to="/" end>Home</NavLink>
			<NavLink to="login" end>Log In</NavLink>
		</div>
		</nav>
	)
}
