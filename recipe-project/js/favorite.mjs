import { getLocalStorage, setLocalStorage } from "./util.mjs";

function displayFavoriteRecipes() {
  const favorites = getLocalStorage("favorites");

  const resultsDiv = document.querySelector("#results");
  resultsDiv.innerHTML = "";
  let cardHTML = "";

  if (favorites.length === 0) {
    cardHTML = "<h2 class='noRecipe'>No favorite recipes found!</h2>";
  } else {
    favorites.forEach((recipe) => {
      cardHTML += `
        <div class="recipe-card">
          <div class="recipe-head">
            <h2 class="title">${recipe.label}</h2>
            <button class="remove-button">Remove</button>
          </div>
          <img class="fav-recipe-img" src="${recipe.image}" alt="image of ${
        recipe.label
      }" />
          <div class="info-container">
            <p class="recipe-info">Calories: ${recipe.calories.toFixed(
              0
            )} kcals</p>
            <a class="recipe-button" href="${
              recipe.url
            }" target="_blank">View Recipe</a>
          </div>
          <p class="recipe-info">Diet Label: ${
            recipe.dietLabels.length > 0 ? recipe.dietLabels : "None"
          }</p>
          <p class="recipe-info">Health Label: ${recipe.healthLabels}</p>
        </div>
      `;
    });
  }

  resultsDiv.innerHTML = cardHTML;

  // Add event listeners to the remove buttons
  const removeButton = document.querySelectorAll(".remove-button");
  removeButton.forEach((button, index) => {
    button.addEventListener("click", () => removeRecipe(index));
  });
}

displayFavoriteRecipes();

function removeRecipe(index) {
  const favorites = getLocalStorage("favorites");
  favorites.splice(index, 1);
  setLocalStorage("favorites", favorites);
  displayFavoriteRecipes();
}
