import { Link, NavLink, useNavigate } from 'react-router'
import { useAuth } from './auth.jsx'
import logo from '../assets/logo.png'
import './navbar.css'

export default function Navbar() {
	const { user, logout } = useAuth(); 
	const navigate = useNavigate();

	const handleLogout = () => {
		logout()
		navigate('/')
	}

	return (
		<nav className="navbar">
		<Link to="/" className="logo-container">
			<img src={logo} className="logo-img" />
			<span className="logo-text">The Recipe Repo</span>
		</Link>
		<div className="nav-links">
			<NavLink to="/" end>Home</NavLink>
		{
			user ? (
				<>
				<NavLink to="recipe-creator" end>Create</NavLink>
				<button onClick={handleLogout} className="logoutBtn">Logout</button>
				</>
			) : (
				<>
				<NavLink to="login" end>Log In</NavLink>
				<NavLink to="signup" end>Sign Up</NavLink>
				</>
			)
		}
		</div>
		</nav>
	)
}
