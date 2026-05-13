import useSWR from 'swr'

const API_BASE = import.meta.env.VITE_API_URL

const fetcher = (url) => fetch(url, { credentials: 'include' }).then(res => res.json());

// Get user's lists
export function useGetShoppingLists() {
	const { data, error, isLoading, mutate } = useSWR(`${API_BASE}/api/shoppinglists`, fetcher)
	return { data, error, isLoading, mutate }
}

// Get list by id
export function useGetSingleList(id) {
	const { data, error, isLoading } = useSWR(`${API_BASE}/api/shoppinglists/${id}`, fetcher)
	return { data, error, isLoading }
}

// Get ingredient list from shopping list
export function useGetListItems(id) {
	const { data, error, isLoading } = useSWR(`${API_BASE}/api/shoppinglists/${id}/print`, fetcher)
	return { data, error, isLoading }
}

// Create new list
export async function postCreateList(name) {
	try {
		const body = JSON.stringify({ name: name })

		const response = await fetch(`${API_BASE}/api/shoppinglists`, {
			method: "POST",
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body,
		})

		const data = await response.json()

		if (response.ok) {
			return { ok: true, message: null }
		} else return { ok: false, message: `Failed to create list: ${data}` }
	} catch (error) {
		console.error("POST REQUEST ERROR:", error)
		return { ok: false, message: error.message }
	}
}

// Delete list
export async function deleteList(id) {
	try {
		const response = await fetch(`${API_BASE}/api/shoppinglists/${id}`, {
			method: "DELETE",
			credentials: 'include',
		})

		if (response.ok) return { ok: true, message: null }
		
		const data = await response.json()
		return { ok: false, message: data }
	} catch (error) {
		console.error("FAILED DELETE REQUEST:", error)
		return { ok: false, message: error.message }
	}
}

// Add to list
export async function postAddRecipeToList(listID, recipeID, quantity) {
	try {
		const response = await fetch(`${API_BASE}/api/shoppinglists/${listID}`, {
			method: "POST",
			credentials: 'include',
			body: JSON.stringify({ recipe_id: recipeID, quantity: parseInt(quantity) }),
			headers: {
				'Content-Type': 'application/json'
			},
		})

		if (response.ok) return { ok: true, message: null }

		const data = await response.json()
		return { ok: false, message: data }
	} catch (error) {
		console.error("FAILED POST REQUEST:", error)
		return { ok: false, message: error.message }
	}
}
