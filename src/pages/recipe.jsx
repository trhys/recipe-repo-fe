import { useParams } from 'react-router'
import { useGetRecipe } from '../api/recipes.js'
import './recipe.css'

export default function Recipe() {
	let params = useParams()
	const { data, error, isLoading } = useGetRecipe(params.id)

	if (isLoading) return (
		<div className="recipe-view">
            	<div className="skeleton recipe-hero-image" />
            	<div className="skeleton" style={{ height: '40px', width: '70%', marginBottom: '20px' }} />
            	<div className="skeleton" style={{ height: '100px', width: '100%' }} />
        	</div>
	)

	if (error) return <p>Something went wrong!</p>

	return (
		<div className="recipe-view">
		    <img src={data.image_url} className="recipe-hero-image" alt={data.title} />
		    
		    <h2>{data.title}</h2>
		    <hr />
		    
		    <div className="recipe-meta">
			<strong>By:</strong> {data.author} <br />
			<strong>Created:</strong> {data.created_at} <br />
			<strong>Updated:</strong> {data.updated_at}
		    </div>

		    <div className="recipe-text-block">{data.description}</div>

		    <h3>Ingredients</h3>
		    <hr />
		    <ul className="ingredients-section">
			{data.ingredients.map(ing => (
			    <li key={ing.name}>
				<span className="ing-name">{ing.name}</span>
				<span className="ing-count">{ing.quantity} {ing.unit}</span>
			    </li>
			))}
		    </ul>

		    <h3>Instructions</h3>
		    <hr />
		    <div className="recipe-text-block">{data.instructions}</div>
		</div>
	);
}
