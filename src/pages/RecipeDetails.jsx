import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import styled from '@emotion/styled'

const API_KEY = 'eeccfccae4944843a48b3f867c77363e' // nicolas' api key
// '0d276903bc344aedb88273ff17d9be70'

const Body = styled.div`
    padding: 2rem;
    /* background-image: linear-gradient(45deg, lightgreen, lightblue); */
`
const RecipeImage = styled.img`
    box-shadow: 0 4px 8px 0 #333;
    margin-bottom: 2rem;
`
const ShortText = styled.div`
    display: flex;
    gap: 0.5rem;

    h3, p{ 
        margin: 0.5rem 0;
    }

    p {
        font-size: 1.15rem;
    }
`
const Instructions = styled.div`
    div ol li {
        font-size: 1.15rem;
    }
`

const Ingredients = styled.div`
    ul li {
        font-size: 1.15rem;
    }
`

const Nutrition = styled.div`
    ul li {
        font-size: 1.15rem;
    }
`

const StyledButton = styled.button`
    border-radius: 0;
    height: 2rem;
    cursor: pointer;
`

export default function RecipeDetails() {
    // TODO: find a way to grab the data from the recipe that was clicked on from the search page
    // Display the individual recipe details and style it to make it look nice and be responsive

    const recipe = useParams()
    const recipeId = recipe.recipe

    console.log("== params:", recipeId)

    const [recipeDetail, setRecipeDetails] = useState(null)

    useEffect(() => {
        fetchRecipeDetails(recipeId)
    }, [recipeId])

    const fetchRecipeDetails = async (id) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`)
            const data = await response.json()
            setRecipeDetails(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }   
    }


    return (
        <Body>
            <h1>Recipe Details</h1>
            {recipeDetails ? 
                (<form onSubmit={(e) => {
                    e.preventDefault()
                    console.log("Added favorite: ", recipeDetails)
                    // dispatch(addTodo(text))
                    // setText("")
                }}>
                    <StyledButton>Add to Favorites</StyledButton>
                </form>)

             : (null)}

            {recipeDetails ? (
                <div>
                    <h2>{recipeDetails.title}</h2>
                    <RecipeImage src={recipeDetails.image} alt={recipeDetails.title} />
                    <ShortText>
                        <h3>Ready In:</h3>
                        <p>{recipeDetails.readyInMinutes} minutes</p>
                    </ShortText>
                    <ShortText>
                        <h3>Servings:</h3>
                        <p>{recipeDetails.servings}</p>
                    </ShortText>
                    <ShortText>
                        <h3>Price per serving:</h3>
                        <p>${recipeDetails.pricePerServing.toFixed(2)}</p>
                    </ShortText>
                    <Ingredients>
                        <h3>Ingredients:</h3>
                        <ul>
                            {recipeDetails.extendedIngredients.map(ingredient => (
                                <li key={ingredient.id}>{ingredient.name}</li>
                            ))}
                        </ul>
                    </Ingredients>
                    <Instructions>
                        <h3>Instructions:</h3>
                        <div dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} />
                    </Instructions>
                    <Nutrition>
                        <h3>Nutrition:</h3>
                        <ul>
                            {recipeDetails.nutrition.nutrients.map(nutrient => (
                                <li key={nutrient.name}>{nutrient.name}: {nutrient.amount}{nutrient.unit}</li>
                            ))}
                        </ul>
                    </Nutrition>

                </div>
            ) : (
                <p>Loading...</p>
            )}

        </Body>
    )
}