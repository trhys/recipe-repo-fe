import RecipeFeed from '../components/recipesFeed.jsx'
import bannerImg from '../assets/banner.png'
import { useAuth } from '../components/auth.jsx'

export default function Home() {
	const { user, logout } = useAuth();

	return (
		<>
		<div>
		<img src={bannerImg} width="100%" height="auto"/>
		{
			user ? (
				<>
				<span>Welcome, {user.name}!</span>
				<p>Create a new recipe or explore shared recipes below!</p>
				</>
			) : (
				<p>Log in to share your own recipes, or explore below!</p>
			)
		}
		<p>Share your recipes and make shopping/meal planning quick and easy. Add recipes to your shopping list for a convenient printout.</p>
		<h1>Explore</h1>
		  <RecipeFeed />
		</div>
		</>
	)
}
