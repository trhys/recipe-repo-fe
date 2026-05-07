import { Link } from 'react-router'
import { useGetRecipeFeed } from '../api/recipes.js'

export default function RecipeFeed() {
	const { data, error, isLoading } = useGetRecipeFeed()

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Something went wrong!</p>

	const feedStyle = {
		height: '800px',
		overflowY: 'auto',
   		border: '1px solid #ccc',
   		padding: '10px'
  	};

	const cardStyle = {
		backgroundColor: 'transparent',
		borderRadius: '12px',
		padding: '16px',
		marginBottom: '12px',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
		border: '1px solid #f0f0f0',
		display: 'flex',
		flexDirection: 'column',
		gap: '8px',
		transition: 'all 0.2s ease',
	};

	const imageStyle = {
	  	width: '100%',           
	  	aspectRatio: '16 / 9', 
	  	objectFit: 'cover',      
		objectPosition: 'center',
	  	borderRadius: '8px',  
	  	display: 'block',
	};

	const feed = data.recipes.map(recipe =>
			<Link to={`recipes/${recipe.id}`}>
			<li key={recipe.id}>
				<div class="content-card" style={cardStyle}>
				{recipe.title}
				<p>Created: {recipe.created_at}</p>
				<p>By: {recipe.author}</p>
				<img
					src={recipe.image_url}
					alt={recipe.title}
					style={imageStyle}
				/>
				</div>
			</li></Link>
		);

	return (
		<div class="recipe-feed" style={feedStyle}>
		<ul style={{ listStyleType: 'none', padding: 0 }}>{feed}</ul>
		</div>
	);
}
