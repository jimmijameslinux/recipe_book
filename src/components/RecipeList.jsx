import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RecipeList = ({ recipes }) => {
  const saveToFavorites = async (recipeId) => {
    try {
      await axios.post("/api/auth/favorites", { recipeId });
      alert("Recipe added to favorites!");
    } catch (error) {
      alert("Failed to add recipe to favorites.");
    }
  };
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <h3>{recipe.title}</h3>
          {/* <p
            dangerouslySetInnerHTML={{ __html: recipe.summary?.slice(0, 100) }}
          ></p> */}
          <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">
            View Recipe
          </Link>
          <button onClick={() => saveToFavorites(recipe.id)}>
            Save to Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
