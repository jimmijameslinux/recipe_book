import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RecipeDetails from "../components/RecipeDetails";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-details">
      <RecipeDetails recipe={recipe} />
    </div>
  );
};

export default RecipePage;
