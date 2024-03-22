import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';

export default function RecipeDetails() {
    // TODO: find a way to grab the data from the recipe that was clicked on from the search page
    // Display the individual recipe details and style it to make it look nice and be responsive

    const recipeId = useParams()
    console.log("== params:", recipeId)

    const [recipeDetails, setRecipeDetails] = useState(null)

    useEffect(() => {
        fetchRecipeDetails(recipeId)
    }, [recipeId])

    const fetchRecipeDetails = async (id) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${id}?apiKey=${API_KEY}`)
            const data = await response.json()
            setRecipeDetails(data)
        } catch (error) {
            console.error(error)
        }   
    }


    return (
        <div>
            <h1>Recipe Details</h1>
            
        </div>
    )
}