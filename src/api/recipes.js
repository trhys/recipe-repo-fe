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
