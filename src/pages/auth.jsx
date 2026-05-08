import { useState } from 'react'
import { useAuth } from '../components/auth.jsx'
import { useNavigate } from 'react-router'
import { postLogin, postSignup } from '../api/auth.js'


export function Login() {
	const [email, setEmail] = useState('Email')
	const [pass, setPass] = useState('Password')
	const { login } = useAuth()
	const navigate = useNavigate()


	async function handleSubmit(e) {
		e.preventDefault()
		const data = await postLogin(email, pass)
		login(data)
		navigate('/')
	}

	return (
		<form onSubmit={handleSubmit}>
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
		<button type="submit">Login</button>
		</form>
	);
}

export function Signup() {
	const [email, setEmail] = useState('Email')
	const [pass, setPass] = useState('Password')
	const [name, setName] = useState('Name')
	const navigate = useNavigate()

	async function handleSubmit(e) {
		e.preventDefault()
		const data = await postSignup(email, pass, name)
		navigate('login')
	}

	return (
		<form onSubmit={handleSubmit}>
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
			type="text"
			placeholder="Username"
			value={name}
			onChange={e => setName(e.target.value)}
			required
		/>
		<button type="submit">Login</button>
		</form>
	);
}
