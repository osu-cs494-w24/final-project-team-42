import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { css } from '@emotion/react'

import ErrorContainer from '../components/ErrorContainer'
import Spinner from '../components/Spinner'
// import Card from './Card'

const API_KEY = 'abd43a26c5aa46e1b48bd1f860160d44'

export default function Search() {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const query = searchParams.get("q")
    const [ inputQuery, setInputQuery ] = useState(query || "")

    const styles = css `
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
    `

    const { fetchStatus, isLoading, error, data } = useQuery({
        queryKey: [ "searchFood", query ],
        queryFn: async () => {
            console.log("== query function called")
            const res = await fetch(
                // to add more parameters just use `&` and the parameter name
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}` 
            )
            return res.json()
        }
    })

    console.log("== isLoading:", isLoading)
    console.log("== fetchStatus:", fetchStatus)
    console.log("== response body:", data)

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: inputQuery })
            }}>
                <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                <button placeholder="Enter Desired Food" type="submit">Search</button>
            </form>
            <h2>Food Results for: {query}</h2>
            {error && <ErrorContainer>Error: {error.message}</ErrorContainer>}
            {isLoading && <Spinner />}
            <ul css={styles}>
                {data?.list && data.list.map(repo => (
                    <li key={repo.id}>
                        <p>{repo.title}</p>
                        <p>{repo.image}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
