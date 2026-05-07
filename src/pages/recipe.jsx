import { useParams } from 'react-router'
import { useGetRecipe } from '../api/recipes.js'

export default function Recipe() {
	let params = useParams()
	const { data, error, isLoading } = useGetRecipe(params.id)

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Something went wrong!</p>

	const view = data.ingredients.map(ing =>
		<li key={ing.name}>
		{ing.name} - {ing.quantity} {ing.unit}
		</li>
	);

	const imageStyle = {
                width: '100%',           
                aspectRatio: '16 / 9', 
                objectFit: 'cover',      
                objectPosition: 'center',
                borderRadius: '8px',  
                display: 'block',
        };

	const textStyle = {
		whiteSpace: 'pre-wrap',
		overflowWrap: 'break-word',
	};

	return (
		<>    
		<img src={data.image_url} style={imageStyle} />
		<h2>{data.title}<hr /></h2>
		<h4>By: {data.author}
        	<br /> Created: {data.created_at}
        	<br /> Updated: {data.updated_at}
		</h4>

		<div style={textStyle}>{data.description}</div> 
	      	<ul><h3>Ingredients</h3><hr width="100%"/>{view}</ul>
	    
		
		<h2>Instructions</h2><hr width="90%"/>
    		<div style={textStyle}>{data.instructions}</div>
		</>
	);
}
