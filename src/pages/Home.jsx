import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const API_KEY = 'abd43a26c5aa46e1b48bd1f860160d44'
// const API_KEY = 'eeccfccae4944843a48b3f867c77363e' // nicolas' api key
// const API_KEY = '0d276903bc344aedb88273ff17d9be70' // jacob's api key

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`

const Title = styled.h1`
    font-size: 2rem;
    color: #333;
    margin-bottom: 2rem;
`

const JokeText = styled.div`
    background-color: #fff;
    padding: 2rem;
    border-radius: 1rem;
    font-size: 1.25rem;
    color: #666;
    max-width: 20rem;
    text-align: center;
    box-shadow: 0 0.5rem 2rem rgba(0,0,0,0.2);
`

export default function RecipeJoke() {

    const [recipeJoke, setRecipeJoke] = useState(null)
    const [ recipeTrivia, setRecipeTrivia ] = useState(null)

    const fetchRecipeJoke = async () => {
        try {
            const response = await fetch(`https://api.spoonacular.com/food/jokes/random?apiKey=${API_KEY}`)
            const data = await response.json()
            setRecipeJoke(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }   
    }

    const fetchRecipeTrivia = async () => {
        try {
            const response = await fetch(`https://api.spoonacular.com/food/trivia/random?apiKey=${API_KEY}`)
            const data = await response.json()
            setRecipeTrivia(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }   
    } 

    useEffect(() => {
        fetchRecipeJoke()
        fetchRecipeTrivia()
    }, [])

    return (
        <Container>
            <Title>Welcome to our Hess' Recipe Finder!</Title>
            <h3>Random food joke:</h3>
            <JokeText>{recipeJoke ? recipeJoke.text : "Loading joke..."}</JokeText>
            <h3>Random food fact:</h3>
            <JokeText>{recipeTrivia? recipeTrivia.text : "Loading food fact..."}</JokeText>
        </Container>
    )
}