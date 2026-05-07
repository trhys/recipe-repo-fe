import RecipeFeed from '../components/recipesFeed.jsx'
import bannerImg from '../assets/banner.png'

export default function Home() {
	return (
		<>
		<div>
		<img src={bannerImg} width="100%" height="179"/>
		<p>Share your recipes and make shopping/meal planning quick and easy. Add recipes to your shopping list for a convenient printout.</p>  
		<h1>Explore</h1>
		  <RecipeFeed />
		</div>
		</>
	)
}
