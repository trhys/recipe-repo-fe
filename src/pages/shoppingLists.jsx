import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../components/auth.jsx'
import { useGetShoppingLists, postCreateList } from '../api/shoppingLists.js'
import './shoppingLists.css'

export default function ShoppingLists() {
	const { user, logout } = useAuth();

	const [showModal, setShowModal] = useState(false)
	const [newName, setNewName] = useState('')

	const { data, error, isLoading } = useGetShoppingLists()

	if (error) {
		console.log(error)
		alert(`Something went wrong: ${error}`)
	}

	function handleCreateList(e) {
		e.preventDefault()
		let { ok, message } = postCreateList(newName)
		if (ok) {
			setShowModal(false)
			setNewName('')
		} else alert(`Something went wrong: ${message}`)
	}

	return (
		<>
        <div className="shopping-lists-container">
            <header className="page-header">
                <h2>Your Shopping Lists</h2>
                <button className="add-list-btn" onClick={() => setShowModal(true)}>
                    + New List
                </button>
            </header>

            <div className="lists-grid">
                {data?.shopping_lists.map(list => (
                    <Link to={`/shopping-list/${list.id}`} key={list.id} className="list-card">
                        <div className="list-info">
                            <h3>{list.name}</h3>
                            <p>Last updated {list.updated_at}</p>
                        </div>
                        <div className="list-arrow">→</div>
                    </Link>
                ))}
            </div>
	</div>
	
		{showModal && (
			<div className="modal-overlay">
			    <div className="modal-content auth-card"> 
				<h3>Name your list</h3>
				<form onSubmit={handleCreateList} className="auth-form">
				    <input 
					autoFocus
					type="text" 
					placeholder="Title" 
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
					required 
				    />
				    <div className="modal-actions">
					<button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
					    Cancel
					</button>
					<button type="submit" className="submit-btn">
					    Create
					</button>
				    </div>
				</form>
			    </div>
			</div>
		)}
        </>
    );
}
