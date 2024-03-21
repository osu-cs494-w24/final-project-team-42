import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import App from './App'
import FetchSearch from './pages/Search'
import RandomSearch from './pages/RandomSearch'

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: "/",
        element: <RandomSearch />,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
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