import { useState } from 'react'


export function Login() {
	const [email, setEmail] = useState('Email')
	const [pass, setPass] = useState('Password')

	function handleSubmit(e) {
		e.preventDefault();
		alert(`logging in with: ${email} - ${pass}`)
	}

	return (
		<form onSubmit={handleSubmit}>
		<input
			placeholder="Email"
			value={email}
			onChange={e => setEmail(e.target.value)}
		/>
		<input
			placeholder="Password"
			value={pass}
			onChange={e => setPass(e.target.value)}
		/>
		<button type="submit">Login</button>
		</form>
	);
}
