const myID = "df832e72";
const myKey = "eb31090e4a9f0390cb3246ebcf8e06c7";

async function searchRecipes(event) {
  event.preventDefault();

  const searchInput = document.querySelector("#searchInput").value;
  try {
    if (searchInput == "") {
      window.alert("Please enter a food or meal");
    } else {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${myID}&app_key=${myKey}&q=${searchInput}`;
      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
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
      <h2 class="title">${recipe.label}</h2>
      <img src="${recipe.image}"/>
      <p>Ingredients ${recipe.ingredientLines}</p>
    </div>
    `;
    return resultsDiv.innerHTML = cardHTML;
  });
}

document
  .querySelector("#searchButton")
  .addEventListener("click", searchRecipes);
