export default function formatDate(timestamp) {
	if (!timestamp) return ''

	const date = new Date(timestamp)

	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	}).format(date)
}
