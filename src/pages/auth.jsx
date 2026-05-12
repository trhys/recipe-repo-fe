import { useState } from 'react'
import { useAuth } from '../components/auth.jsx'
import { useNavigate, Link } from 'react-router'
import { postLogin, postSignup } from '../api/auth.js'
import './auth.css'


export function Login() {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const { login } = useAuth()
	const navigate = useNavigate()


	async function handleSubmit(e) {
		e.preventDefault()
		const data = await postLogin(email, pass)
		login(data)
		navigate('/')
	}

	return (
		<div className="auth-container">
		<div className="auth-card">
		<h2>Welcome Back</h2>
            	<p>Ready to cook something new?</p>

		<form className="auth-form" onSubmit={handleSubmit}>
		<input
			type="email"
			placeholder="Email"
			value={email}
			onChange={e => setEmail(e.target.value)}
			required
		/>
		<input
			type="password"
			placeholder="Password"
			value={pass}
			onChange={e => setPass(e.target.value)}
			required
		/>
		<button classname="submit-btn" type="submit">Login</button>
		</form>

		<div className="auth-footer">
			Don't have an account? <Link to="/signup">Sign Up</Link>
           	 </div>
		</div>
		</div>
	);
}

export function Signup() {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [name, setName] = useState('')
	const navigate = useNavigate()

	async function handleSubmit(e) {
		e.preventDefault()
		if (pass !== confirmPass) {
			alert("Passwords must match")
			return
		}

		const data = await postSignup(email, pass, name)
		navigate('login')
	}

	return (
		<div className="auth-container">
		<div className="auth-card">
		<h2>Let's Get Cooking</h2>
		<p>Enter your email and username below to sign up</p>
		<form className="auth-form" onSubmit={handleSubmit}>
		<input
			type="email"
			placeholder="Email"
			value={email}
			onChange={e => setEmail(e.target.value)}
			required
		/>
		<input
			type="password"
			placeholder="Password"
			value={pass}
			onChange={e => setPass(e.target.value)}
			required
		/>
		<input
			type="password"
			placeholder="Confirm password"
			value={confirmPass}
			onChange={e => setConfirmPass(e.target.value)}
			className={pass !== confirmPass && confirmPass.length > 0 ? "error" : ""}
			required
		/>
			{pass !== confirmPass && confirmPass.length > 0 && (
				<span className="error-text">Passwords do not match</span>
			)}
		<input
			type="text"
			placeholder="Username"
			value={name}
			onChange={e => setName(e.target.value)}
			required
		/>
		<button className="submit-btn" type="submit">Sign up</button>
		</form>
		
		<div className="auth-footer">
			Already have an account? <Link to="/login">Login</Link>
           	 </div>

		</div>
		</div>
	);
}
