const API_BASE = import.meta.env.VITE_API_URL

// Login
export async function postLogin(email, password) {
	const opts = {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ email, password }),
	};

	try {
		const response = await fetch(`${API_BASE}/api/sessions`, opts)
		const data = await response.json()
		if (!response.ok) throw new Error(`Failed to login: ${data.error}`)
		return data
	} catch (error) {
		console.log(error)
	}
}

// Sign up
export async function postSignup(email, password, name) {
	const opts = {
		method: "POST",
		body: JSON.stringify({ email, password, name }),
	};

	try {
		const response = await fetch(`${API_BASE}/api/users`, opts)
		const data = await response.json()
		if (!response.ok) throw new Error(`Failed to register user: ${data.error}`)
		return data
	} catch (error) {
		console.log(error)
	}
}
