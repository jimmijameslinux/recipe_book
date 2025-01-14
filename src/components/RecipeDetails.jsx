import React from "react";
const RecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return <p>Loading...</p>;
  }

  console.log(recipe.summary);

  return (
    <div className="recipe-details-container">
      <div className="recipe-header">
        <h1 className="recipe-title">{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      </div>

      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        </div>
        // Button in RecipeDetails.js ;
        <div className="instructions-section">
          <h2>Instructions</h2>
          {recipe.instructions ? (
            <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
          ) : (
            <p>Instructions are not available for this recipe.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
