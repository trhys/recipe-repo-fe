import { useState } from 'react'
import { useAuth } from '../components/auth.jsx'
import { useGetIngredients, useGetUnits } from '../api/recipes.js'
import './create.css'

export function RecipeCreator() {
	const { user, logout } = useAuth();
	const [title, setTitle] = useState('')
	const [image, setImage] = useState(null)
	const [ingredients, setIngredients] = useState([{ rowID: Date.now(), id: '', quantity: 0, units: '' }])
	const [description, setDescription] = useState('')
	const [instructions, setInstructions] = useState('')
    const [availableUnits, setAvailableUnits] = useState([{ row: '', units: [] }])
	const { data: ingredientData, error: ingredientError, isLoading: ingredientIsLoading } = useGetIngredients()

	if (ingredientError) return (
		<p>Something went wrong</p>
	)

	function handleSubmit() {}
	function handleSelectIngredient(rowID, id) {
        let units = postGetUnits(id)
		setIngredients(ingredients.map(row => row.rowID === rowID ? {...row, id: id } : row));
        //setAvailableUnits(availableUnits.map(row => { row: id, units: units })
	}

	function handleSelectQuantity(rowID, value) {
		setIngredients(ingredients.map(row => row.rowID === rowID ? {...row, quantity: value } : row));
	}

    function handleSelectUnits(rowID, unit) {
        setIngredients(ingredients.map(row => row.rowID === rowID ? {...row, units: unit } : row));
    }

	const addRow = (e) => {
		e.preventDefault()
		setIngredients([...ingredients, { rowID: Date.now(), id: '' }]);
	}

	const removeRow = (rowID) => {
	    if (ingredients.length > 1) setIngredients(ingredients.filter((row) => row.rowID !== rowID));	
	};

	return (
		<>
		<form onSubmit={handleSubmit}>
		<input
		  type="text"
		  value={title}
		  placeholder="Title"
		  onChange={e => setTitle(e.target.value)}
		  required
		/>
		<div>
		<label>Upload image:</label>
		<input
		  type="file"
		  value={image}
		  onChange={e => setImage(e.target.value)}
		  accept=".jpg, .jpeg, .png"
		/></div>
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
						<label>Quantity:</label>
						<input
							type="number"
							value={row.quantity}
							placeholder='1'
							onChange={e => handleSelectQuantity(row.rowID, e.target.value)}
							required
						/>
                        <label>Units:</label>
                        <select
                        value={row.units}
                        onChange={e => handleSelectUnits(row.rowID, e.target.value)}
                        >
                        <option value="">{row.id == "" ? '...' : 'Select units'}</option>
                        {}
                          </select>
						<button type="button" onClick={() => removeRow(row.rowID)}>x</button>
					</div>
				))}

				<button type="button" onClick={addRow}>Add</button>
			</div>
		</div>
		</form>
		</>
	)
}
