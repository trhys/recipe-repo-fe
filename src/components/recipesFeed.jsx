import { Link } from 'react-router'
import { useGetRecipeFeed } from '../api/recipes.js'
import './recipesFeed.css'
import formatDate from '../utility/format.js'

export default function RecipeFeed() {
	const { data, error, isLoading } = useGetRecipeFeed()

	if (isLoading) return (
		<div className="recipe-feed">
		    {[1, 2, 3].map(n => (
		      <div key={n} className="skeleton-card">
			<div className="skeleton skeleton-title"></div>
			<div className="skeleton" style={{ height: '14px', width: '30%' }}></div>
			<div className="skeleton skeleton-image"></div>
		      </div>
		    ))}
		  </div>
	)

	if (error) return <p>Something went wrong!</p>

	const feed = data.recipes.map(recipe =>
			<Link to={`recipes/${recipe.id}`}>
			<li key={recipe.id}>
				<div class="content-card">
				<h3>{recipe.title}</h3>
				<p>By: {recipe.author} • {formatDate(recipe.created_at)}</p>
				<img
					src={recipe.image_url}
					alt={recipe.title}
				/>
				</div>
			</li></Link>
		);

	return (
		<div class="recipe-feed">
		<ul style={{ listStyleType: 'none', padding: 0 }}>{feed}</ul>
		</div>
	);
}
