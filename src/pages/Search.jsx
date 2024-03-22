import { useEffect, useState } from 'react'
import { useSearchParams, Link, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { css } from '@emotion/react'
import styled from '@emotion/styled'


import ErrorContainer from '../components/ErrorContainer'
import Spinner from '../components/Spinner'

const API_KEY = 'abd43a26c5aa46e1b48bd1f860160d44'
// const API_KEY = 'eeccfccae4944843a48b3f867c77363e' // nicolas' api key
// const API_KEY = '0d276903bc344aedb88273ff17d9be70' // jacob's api key

export default function Search() {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const query = searchParams.get("q")

    const [diet, setDiet] = useState('')
    const [intolerance, setIntolerance] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [ inputQuery, setInputQuery ] = useState(query || "")

    
    const styles = css`
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
    `

    const Results = styled.ul`
        padding: 0;
        li {
        margin: 1rem;
        padding: 1rem;
        border: 1px solid #aaa;
        border-radius: 10px;
        width: 18rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    `

    const formStyles = css`
        padding: 2rem;
    `

    const ButtonStyles = styled.button`
        border-radius: 0;
        height: 1.5rem;
    `

    const queryFn = async () => {
        const params = new URLSearchParams({
            apiKey: API_KEY,
            query: query
        })

        // add parameters if necessary
        if (diet) params.append('diet', diet)
        if (intolerance) params.append('intolerance', intolerance)
        if (cuisine) params.append('cuisine', cuisine)

        // `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`
        const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
        const res = await fetch(url)
        return res.json()
    }

    const { fetchStatus, isLoading, error, data } = useQuery({
        queryKey: [ "searchFood", query, diet, intolerance, cuisine ],
        queryFn // call query function to fetch data
    })

    console.log("== isLoading:", isLoading)
    console.log("== fetchStatus:", fetchStatus)
    console.log("== response body:", data)

    return (
        <div style={{padding: '2rem'}}>
            <form onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: inputQuery, diet, intolerance, cuisine })
                console.log("diet: ", diet)
                console.log("intolerances: ", intolerance)
                console.log("cuisine: ", cuisine)
            }}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <input style={{
                        width: '50%',
                        marginBottom: '0.5rem',
                        marginRight: '0.5rem',

                        }} value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                    <ButtonStyles placeholder="Enter Desired Food" type="submit">Search</ButtonStyles>
                </div>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <select value={diet} onChange={e => setDiet(e.target.value)}>
                        <option value="">Select Diet</option>
                        <option value="gluten free">Gluten Free</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="pescetarian">Pescetarian</option>
                        <option value="paleo">Paleo</option>
                        <option value="keto">Keto</option>
                    </select>

                    <select value={intolerance} onChange={e => setIntolerance(e.target.value)}>
                        <option value="">Select Intolerance</option>
                        <option value="dairy">Dairy</option>
                        <option value="egg">Egg</option>
                        <option value="gluten">Gluten</option>
                        <option value="grain">Grain</option>
                        <option value="peanut">Peanut</option>
                        <option value="seafood">Seafood</option>
                        <option value="sesame">Sesame</option>
                        <option value="shellfish">Shellfish</option>
                        <option value="soy">Soy</option>
                        <option value="sulfite">Sulfite</option>
                        <option value="tree nut">Tree Nut</option>
                        <option value="wheat">Wheat</option>
                    </select>

                    <select value={cuisine} onChange={e => setCuisine(e.target.value)}>
                        <option value="">Select Cuisine</option>
                        <option value="african">African</option>
                        <option value="asian">Asian</option>
                        <option value="american">American</option>
                        <option value="british">British</option>
                        <option value="cajun">Cajun</option>
                        <option value="caribbean">Caribbean</option>
                        <option value="chinese">Chinese</option>
                        <option value="eastern european">Eastern European</option>
                        <option value="european">European</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="greek">Greek</option>
                        <option value="indian">Indian</option>
                        <option value="irish">Irish</option>
                        <option value="italian">Italian</option>
                        <option value="japanese">Japanese</option>
                        <option value="jewish">Jewish</option>
                        <option value="korean">Korean</option>
                        <option value="latin american">Latin American</option>
                        <option value="mediterranean">Mediterranean</option>
                        <option value="mexican">Mexican</option>
                        <option value="middle eastern">Middle Eastern</option>
                        <option value="nordic">Nordic</option>
                        <option value="southern">Southern</option>
                        <option value="spanish">Spanish</option>
                        <option value="thai">Thai</option>
                        <option value="vietnamese">Vietnamese</option>
                    </select>
                </div>
            </form>
            <h2>Food Results for: {query}</h2>
            {error && <ErrorContainer>Error: {error.message}</ErrorContainer>}
            {isLoading && <Spinner />}
            <Results css={styles}>
                {data?.results && data.results.map(recipe => (
                    <li key={recipe.id}>
                        <p>
                            <Link to={`/search/${recipe.id}`}>{recipe.title}</Link>
                        </p>
                        <img src={recipe.image} alt={recipe.title}/>
                    </li>
                ))}
            </Results>
        </div>
    )
}