import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import ErrorContainer from '../components/ErrorContainer'
import Spinner from '../components/Spinner'

// const API_KEY = '0d276903bc344aedb88273ff17d9be70'

// Styled components
const RecipeContainer = styled.div`
  margin: 20px;
  font-family: 'Arial', sans-serif;
`

const RecipeTitle = styled.h2`
  color: #333;
`

const RecipeImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`

const RecipeSummary = styled.p`
  color: #666;
`

const RecipeDetails = styled.p`
  color: #444;
`

const RecipeLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const RandomRecipe = () => {
  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const styles = css`
  margin: 20;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  `

  useEffect(() => {
    const fetchRandomRecipe = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`)
        if (!response.ok) {
          throw new Error('Failed to fetch random recipe')
        }
        const data = await response.json()
        setRecipe(data.recipes[0])
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRandomRecipe()
  }, [])

  return (
    <RecipeContainer css={styles}>
      {error && <ErrorContainer>Error: {error.message}</ErrorContainer>}
      {isLoading ? (
        <Spinner />
      ) : recipe ? (
        <div>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <RecipeImage src={recipe.image} alt={recipe.title} />
          <RecipeSummary dangerouslySetInnerHTML={{ __html: recipe.summary }}></RecipeSummary>
          <RecipeDetails>Ready in: {recipe.readyInMinutes} minutes</RecipeDetails>
          <RecipeDetails>Servings: {recipe.servings}</RecipeDetails>
          <RecipeDetails><RecipeLink href={recipe.sourceUrl} rel='noreferrer' target='_blank'>View Recipe</RecipeLink></RecipeDetails>
        </div>
      ) : (
        <p>Unable to load recipe.</p>
      )}
    </RecipeContainer>
  );
};

export default RandomRecipe