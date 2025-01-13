import axios from "axios";
import { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        );

        const recipesWithDetails = await Promise.all(
          response.data.results.map(async (recipe) => {
            const detailsResponse = await axios.get(
              `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
            );
            return {
              ...recipe,
              extendedIngredients: detailsResponse.data.extendedIngredients,
            };
          })
        );

        setRecipes(recipesWithDetails);
        setSearchResults(recipesWithDetails); // Initialize search results
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (query, searchBy, category) => {
    let filtered = recipes;

    // Filter by search type: name or ingredients
    if (query) {
      filtered = filtered.filter((recipe) => {
        if (searchBy === "name") {
          return recipe.title.toLowerCase().includes(query.toLowerCase());
        } else if (searchBy === "ingredients") {
          return recipe.extendedIngredients?.some((ingredient) =>
            ingredient.original.toLowerCase().includes(query.toLowerCase())
          );
        }
        return false;
      });
    }

    // Filter by category if selected
    if (category && category !== "all") {
      filtered = filtered.filter((recipe) =>
        recipe.dishTypes.includes(category.toLowerCase())
      );
    }

    setSearchResults(filtered);
  };

  return (
    <div className="home">
      <h1>Recipe Book</h1>
      <SearchBar
        onSearch={(query, searchBy, category) =>
          handleSearch(query, searchBy, category)
        }
      />

      {recipes ? <RecipeList recipes={searchResults} /> : <p>Loading...</p>}
    </div>
  );
};

export default Home;
