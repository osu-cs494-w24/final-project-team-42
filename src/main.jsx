import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import App from './App'
import FetchSearch from './pages/Search'
import RandomSearch from './pages/RandomSearch'
import RecipeDetails from './pages/RecipeDetails'
import Favorites from './pages/Favorites'

import { Provider } from 'react-redux'
import store from './redux/store'


import { Root, Home, ErrorPage } from './Routes'

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Root><ErrorPage /></Root>,
        children: [
            { index: true, element: <Home /> },
            { path: "search", element: <FetchSearch /> },
            { path: "search/:recipe", element: <RecipeDetails /> },
            { path: "random-recipe", element: <RandomSearch /> },
            { path: "favorites", element: <Favorites /> }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>,
)

/*
        Path to make the fetchSearch work

        path: "/",
        element: <FetchSearch />,
        children: [
            { path: "fetch-search", element: <FetchSearch /> },
            { index: true, element: <Navigate to="/fetch-search" replace /> }
        ]
*/