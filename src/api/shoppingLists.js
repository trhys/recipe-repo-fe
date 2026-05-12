import useSWR from 'swr'

const API_BASE = import.meta.env.VITE_API_URL

const fetcher = (url) => fetch(url, { credentials: 'include' }).then(res => res.json());

// Get user's lists
export function useGetShoppingLists() {
	const { data, error, isLoading } = useSWR(`${API_BASE}/api/shoppinglists`, fetcher)
	return { data, error, isLoading }
}

// Create new list
export async function postCreateList(name) {
	try {
		const body = JSON.stringify({ name: name })

		const response = await fetch(`${API_BASE}/api/shoppinglists`, {
			method: "POST",
			credentials: 'include',
			body: body,
		})

		const data = await response.json()

		if (response.ok) {
			return { ok: true, message: null }
		} else return { ok: false, message: `Failed to create list: ${data.error}` }
	} catch (error) {
		alert(`Something went wrong: ${error}`)
	}
}
