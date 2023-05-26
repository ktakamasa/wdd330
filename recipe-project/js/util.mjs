export function getLocalStorage() {
    const storedData = localStorage.getItem("recipes");
    if (storedData) {
      displayRecipes(JSON.parse(storedData));
    }
  }
  
export function setLocalStorage() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }
  