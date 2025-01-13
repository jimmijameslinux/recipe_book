import React from "react";
import { Link } from "react-router-dom";

const RecipeList = ({ recipes }) => {
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
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
