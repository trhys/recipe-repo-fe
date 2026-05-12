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
export function useGetUnits(id) {
	const { data, error, isLoading } = useSWR(`${API_BASE}/api/ingredients/${id}/units`, fetcher)
	return { data, error, isLoading }
}

// Create new recipe and return success status + recipe id if successful
export async function postRecipe(title, image, ingredients, description, instructions) {
	try {
		const ingData = ingredients.map((i) => ({
			id: i.id,
			quantity: parseFloat(i.quantity) || 0,
			unit: i.units,
		}));

		const body = JSON.stringify({ title: title, ingredients: ingData, description: description, instructions: instructions })

		const formData = new FormData()
		formData.append("payload", body)
		formData.append("image", image)

		let response = await fetch(`${API_BASE}/api/recipes`, {
			method: "POST",
			credentials: 'include',
			body: formData,
		})

		const data = await response.json()
		
		if (response.ok) {
			return { id: data.id, ok: true, message: null }
		}
	} catch (error) {
		console.log(error)
		return { id: null, ok: false, message: error }
	}
}	
