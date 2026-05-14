import useSWR from 'swr'

const API_BASE = import.meta.env.VITE_API_URL

const authFetcher = (url) => fetch(url, { credentials: 'include' }).then(res => res.json());

// Get user's info for profile page
export function useGetUserProfile(id) {
        const { data, error, isLoading, mutate } = useSWR(`${API_BASE}/api/users/${id}`, authFetcher)
        return { data, error, isLoading, mutate }
}

// Upload avatar image
export async function updateSetUserAvatar(file) {
	try {
		const formData = new FormData()
		formData.append("image", file)
		const response = await fetch(`${API_BASE}/api/users`, {
			method: "PUT",
			credentials: 'include',
			body: formData
		})

		if (response.ok) {
			return { ok: true, message: null }
		}

		const data = await response.json()
		return { ok: false, message: data }
	} catch (error) {
		console.error("FAILED UPDATE REQUEST:", error)
		return { ok: false, message: error.message }
	}
}
