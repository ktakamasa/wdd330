const myID = "df832e72";
const myKey = "eb31090e4a9f0390cb3246ebcf8e06c7";

async function searchRecipes(event) {
    event.preventDefault();

    try {
        const searchInput = document.querySelector("#searchInput").value;
        const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${myID}&app_key=${myKey}&q=${searchInput}`;
        const res = await fetch(url);

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            displayRecipes(data);
        } else {
            throw Error(await res.text());
        }
    } catch (err) {
        console.log(err);
    }
}

function displayRecipes(data) {
    const resultsDiv = document.querySelector("#results");
    resultsDiv.innerHTML = "";

    data.hits.forEach((hit) => {
        const recipe = hit.recipe;

        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";

        const title = document.createElement("h2");
        title.classList = "title"
        title.textContent = recipe.label;

        const image = document.createElement("img");
        image.src = recipe.image;

        const ingredients = document.createElement("p");
        ingredients.textContent = `Ingredients: ${recipe.ingredientLines.join(", ")}`;

        recipeCard.appendChild(title);
        recipeCard.appendChild(image);
        recipeCard.appendChild(ingredients);

        resultsDiv.appendChild(recipeCard);
    });
}

document.querySelector("#searchButton").addEventListener("click", searchRecipes);

