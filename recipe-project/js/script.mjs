import { getLocalStorage, setLocalStorage } from "./util.mjs";

const myID = "df832e72";
const myKey = "eb31090e4a9f0390cb3246ebcf8e06c7";

async function searchRecipes(event) {
  event.preventDefault();

  const searchInput = document.querySelector("#searchInput").value;
  try {
    if (searchInput === "") {
      window.alert("Please enter a food or meal");
    } else {
      let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${myID}&app_key=${myKey}&q=${searchInput}`;

      if (selectedDiet !== "") {
        url += `&diet=${selectedDiet}`;
      }
      if (selectedHealth !== "") {
        url += `&health=${selectedHealth}`;
      }

      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
        if (data.count == 0) {
          window.alert("Food or meal not found!");
        }
        console.log(data);
        displayRecipes(data);
      } else {
        throw Error(await res.text());
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function displayRecipes(data) {
  const resultsDiv = document.querySelector("#results");
  resultsDiv.innerHTML = "";
  let cardHTML = "";

  data.hits.forEach((hit) => {
    const recipe = hit.recipe;
    cardHTML += `
    <div class="recipe-card">
      <div class="recipe-head">
      <h2 class="title">${recipe.label}</h2>
      <button class="save-button">Save</button>
      </div>
      <img src="${recipe.image}" alt="image of ${recipe.label}"/>
      <div class="info-container">
      <p class="recipe-info">Calories: ${recipe.calories.toFixed(0)} kcals</p>
      <a class="recipe-button" href="${
        recipe.url
      }" target="_blank">View Recipe</a>
      </div>
      <p class="recipe-info">Diet Label: ${
        recipe.dietLabels.length > 0 ? recipe.dietLabels : "None"
      }</p>
      <p class="recipe-info">Heath Label: ${recipe.healthLabels}</p>
      <!--<p>Ingredients ${recipe.ingredientLines}</p>--> 
    </div>
    `;
  });

  resultsDiv.innerHTML = cardHTML;

  // Add event listeners to the save buttons
  const saveButtons = document.querySelectorAll(".save-button");
  saveButtons.forEach((button, index) => {
    button.addEventListener("click", () => saveRecipe(data.hits[index].recipe));
  });
}

document
  .querySelector("#searchButton")
  .addEventListener("click", searchRecipes);

function saveRecipe(recipe) {
  const favorites = getLocalStorage("favorites");

  // Check if the recipe already exists in favorites
  const duplicate = favorites.some((favRecipe) => favRecipe.uri === recipe.uri);

  if (duplicate) {
    window.alert("This recipe is already saved!");
  } else {
    favorites.push(recipe);
    setLocalStorage("favorites", favorites);
    window.alert("Recipe saved!");
  }
}

let selectedDiet = ""; 
let selectedHealth = ""; 
const dietFilterSelect = document.querySelector("#dietFilter");
dietFilterSelect.addEventListener("change", () => {
  selectedDiet = dietFilterSelect.value;
})
const healthFilterSelect = document.querySelector("#healthFilter");
dietFilterSelect.addEventListener("change", () => {
  selectedHealth = healthFilterSelect.value;
})