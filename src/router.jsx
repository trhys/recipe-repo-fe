import { createBrowserRouter } from 'react-router'
import App from './App.jsx'
import Home from './pages/home.jsx'
import Recipe from './pages/recipe.jsx'
import { RecipeCreator } from './pages/create.jsx'
import { Login, Signup } from './pages/auth.jsx'

const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{ index: true, Component: Home },
			{ path: "recipes/:id", Component: Recipe },
			{ path: "login", Component: Login },
			{ path: "signup", Component: Signup },
			{ path: "recipe-creator", Component: RecipeCreator },
		],
	},
])

export default router;
