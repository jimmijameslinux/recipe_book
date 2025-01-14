import axios from "axios";
import { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [e, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        );

        if (response.status === 402) {
          throw new Error("Api issue");
          return;
        }

        console.log(response.status);

        const recipesWithDetails = await Promise.all(
          response.data.results.map(async (recipe) => {
            const detailsResponse = await axios.get(
              `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
            );
            return {
              ...recipe,
              extendedIngredients: detailsResponse.data.extendedIngredients,
              vegetarian: detailsResponse.data.vegetarian,
              dishTypes: detailsResponse.data.dishTypes,
            };
          })
        );

        setRecipes(recipesWithDetails);
        setSearchResults(recipesWithDetails); // Initialize search results
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
        setError(error.message);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (query, searchBy, category) => {
    let filtered = recipes;

    // Filter by search type: name or ingredients
    if (query) {
      filtered = filtered.filter((recipe) => {
        // console.log(recipe);
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

  // console.log(e);

  return (
    <div className="home">
      <h1>Recipe Book</h1>
      <SearchBar
        onSearch={(query, searchBy, category) =>
          handleSearch(query, searchBy, category)
        }
      />
      {recipes.length > 0 ? (
        <RecipeList recipes={searchResults} />
      ) : (
        <p>{e ? <b style={{ color: "red" }}>{e}</b> : <b>loading</b>}</p>
      )}
    </div>
  );
};

export default Home;
