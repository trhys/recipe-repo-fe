import useSWR from 'swr'

const API_BASE = import.meta.env.VITE_API_URL

const fetcher = (url) => fetch(url).then(res => res.json());

// Get recipe feed
export function useGetRecipeFeed() {
	const { data, error, isLoading } = useSWR(`${API_BASE}/api/recipes`, fetcher)
	return { data, error, isLoading }
}

// Get individual recipe
export function useGetRecipe(id) {
	const { data, error, isLoading } = useSWR(`${API_BASE}/api/recipes/${id}`, fetcher)
	return { data, error, isLoading }
}

// Get ingredients for recipe creator
export function useGetIngredients() {
	const { data, error, isLoading } = useSWR(`${API_BASE}/api/ingredients`, fetcher)
	return { data, error, isLoading }
}

// Get ingredient units for recipe creator
export async function useGetUnits(id) {
	try {
		const response = await fetch(`${API_BASE}/api/ingredients`, {
			method: "POST",
			body: JSON.stringify({ ingredient_id: id }),
		})

		const data = await response.json()
		if (!response.ok) throw new Error(`Couldn't fetch units - ERROR: ${data.error}`)

		return data
	} catch (error) {
		console.log(error)
	}
}
