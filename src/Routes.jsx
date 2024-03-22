import {
    Link,
    NavLink,
    Outlet,
    useParams,
    useSearchParams,
    useRouteError
} from 'react-router-dom'


export function Home() {
    return (
        <>
            <h1>Home</h1>
            <p><Link to="/search">Search</Link></p>
            <p><Link to="/random-recipe">Random Recipe</Link></p>
        </>
    )
}

export function Root(props) {
    const { children } = props
    return (
        <>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/search">Search</NavLink></li>
                    <li><NavLink to="/random-recipe">Random Recipe</NavLink></li>
                    <li><NavLink to="/favorites">Favorites</NavLink></li>
                </ul>
            </nav>
            <main>{children || <Outlet />}</main>
        </>
    )
}

export function ErrorPage() {
    const error = useRouteError()
    console.error(error)
    return (
        <>
            <h1>Error</h1>
            <p>{error.statusText || error.message}</p>
        </>
    )
}