import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../components/auth.jsx'
import { useGetIngredients, useGetUnits, postRecipe } from '../api/recipes.js'
import './create.css'

function UnitSelect({ ingredientId, selectedUnit, onSelect }) {
    	const { data, error, isLoading } = useGetUnits(ingredientId);
	if (error) console.log(error)

    return (
        <select 
	    value={selectedUnit} 
	    onChange={(e) => onSelect(e.target.value)}
	    disabled={isLoading || !ingredientId}>

            <option value="">{!ingredientId ? '...' : 'Select units'}</option>
	    {data?.units.map((opt) => (
                <option key={opt.name} value={opt.name}>
                    {opt.name}
                </option>
            ))}

        </select>
    );
}

export function RecipeCreator() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	/* STATE */
	const [title, setTitle] = useState('')
	const [image, setImage] = useState(null)
	const [preview, setPreview] = useState(null)
	const [ingredients, setIngredients] = useState([{ rowID: Date.now(), id: '', quantity: 0, units: '' }])
	const [description, setDescription] = useState('')
	const [instructions, setInstructions] = useState('')
    	
	/* Get all ingredients from backend to populate select options */
	const { data: ingredientData, error: ingredientError, isLoading: ingredientIsLoading } = useGetIngredients()

	if (ingredientError) return (
		<p>Something went wrong</p>
	)

	async function handleSubmit(e) {
		e.preventDefault()
		let { id, ok, message } = await postRecipe(title, image, ingredients, description, instructions)
		if (ok) {
			navigate(`/recipes/${id}`)
		} else alert(`Failed! ${message}`)
	}

	function handleSelectIngredient(rowID, id) {
		setIngredients(ingredients.map(row => row.rowID === rowID ? {...row, id: id } : row))
	}

	function handleSelectQuantity(rowID, value) {
		setIngredients(ingredients.map(row => row.rowID === rowID ? {...row, quantity: value } : row))
	}

    	function handleSelectUnits(rowID, unit) {
        	setIngredients(ingredients.map(row => row.rowID === rowID ? {...row, units: unit } : row))
    	}

	const handleSelectImage = (e) => {
		const file = e.target.files[0]
		if (file) {
			setImage(file)
			setPreview(URL.createObjectURL(file))
		}
	}

	const addRow = (e) => {
		e.preventDefault()
		let rowID = Date.now()
		setIngredients([...ingredients, { rowID: rowID, id: '', quantity: 0, units: '' }])
	}

	const removeRow = (rowID) => {
	    if (ingredients.length > 1) {
		    setIngredients(ingredients.filter((row) => row.rowID !== rowID))
	    }
	}

	return (
		<>
		<form onSubmit={handleSubmit}>
		<input
		  className="recipe-title"
		  type="text"
		  value={title}
		  placeholder="Title"
		  onChange={e => setTitle(e.target.value)}
		  required
		/>
		<div className="image-upload">
		    <label className="image-upload-label">
		      {preview ? (
			    <div className="preview-container">
				<img src={preview} alt="Preview" className="image-preview" />
				<div className="change-image-overlay">Change Image</div>
			    </div>
			) : (
			    <>
				<strong>📷 Click to upload cover image</strong>
				<span>JPG, PNG or JPEG</span>
			    </>
			)}
		      <input
			type="file"
			className="hidden-file-input"
			onChange={handleSelectImage}
			accept=".jpg, .jpeg, .png"
		      />
		    </label>
		  </div>
		<div className="ingredient-select">
			<div className="ingredients">
				<label>Ingredients</label><hr />
				{ ingredients.map((row) => (
					<div key={row.rowID} className="ingredient-row">
						<select
						value={row.id}
						onChange={e => handleSelectIngredient(row.rowID, e.target.value)}
						disabled={ingredientIsLoading}
						>
						<option value="">{ingredientIsLoading ? 'Loading...' : 'Select an ingredient'}</option>
						{
							ingredientData?.ingredients.map((opt) => (
								<option key={opt.id} value={opt.id}>
									{opt.name}
								</option>
							))
						}
						</select>
						<input
							type="number"
							value={row.quantity}
							placeholder='1'
							onChange={e => handleSelectQuantity(row.rowID, e.target.value)}
							required
						/>
				
				<UnitSelect
					key={`${row.rowID}-${row.id}`}
					ingredientId={row.id}
					selectedUnit={row.units}
					onSelect={(unit) => handleSelectUnits(row.rowID, unit)}
				/>

				<button type="button" onClick={() => removeRow(row.rowID)}>x</button>
				</div>
				
				))}

				<button type="button" onClick={addRow}>Add</button>
				<hr />
			</div>
		</div>

		<label>Description:</label>
		<textarea 
		    placeholder="Description" 
		    value={description} 
		    onChange={e => setDescription(e.target.value)} 
		/><br/>
		
		<label>Instructions:</label>
		<textarea 
		    placeholder="Instructions" 
		    value={instructions} 
		    onChange={e => setInstructions(e.target.value)} 
		/><br/>

		<button type="submit">Create Recipe</button>

		</form>
		</>
	)
}
