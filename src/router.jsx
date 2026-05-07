import { createBrowserRouter } from 'react-router'
import App from './App.jsx'
import Home from './pages/home.jsx'
import Recipe from './pages/recipe.jsx'
import { Login } from './pages/auth.jsx'

const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{ index: true, Component: Home },
			{ path: "recipes/:id", Component: Recipe },
			{ path: "login", Component: Login },
		],
	},
])

export default router;
