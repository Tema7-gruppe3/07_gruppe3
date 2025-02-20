// Finder alt efter ?
const queryString = window.location.search;

//Finder en bestemt parameter efter ?
const urlParams = new URLSearchParams(queryString);

//Henter parameteren
const recipeId = urlParams.get("id");
console.log("id", recipeId);

//Finder HTML-containeren, hvor opskriften skal vises
let recipeContainer = document.querySelector(".recipe_card");

//Henter opskriften fra API'et baseret på "recipeId"
fetch(`https://dummyjson.com/recipes/${recipeId}`)
  .then((response) => response.json())
  .then((data) => {
    //Dynamisk opbygning af HTML med opskriftsdata
    recipeContainer.innerHTML = `
            <div class="recepe_image">
                <img src="https://cdn.dummyjson.com/recipe-images/${recipeId}.webp" alt="recipe-image">
            </div>
          
            <div class="product_container">
                <div>
                  <h1>${data.name}</h1>
            <h2>${data.cuisine}</h2>
                    <p>${data.instructions}</p>
                </div>
                <div class="ingredients_container">
                    <h2>Ingredients</h2>
                    <ul>
                        <li class="${!data.ingredients[1] && "hide"}"><input type="checkbox">&nbsp${data.ingredients[1]}</li>
                        <li class="${!data.ingredients[2] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[2]}</li>
                        <li class="${!data.ingredients[3] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[3]}</li>
                        <li class="${!data.ingredients[4] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[4]}</li>
                        <li class="${!data.ingredients[5] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[5]}</li>
                        <li class="${!data.ingredients[6] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[6]}</li>
                        <li class="${!data.ingredients[7] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[7]}</li>
                        <li class="${!data.ingredients[8] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[8]}</li>
                        <li class="${!data.ingredients[9] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[9]}</li>
                        <li class="${!data.ingredients[10] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[10]}</li>
                        <li class="${!data.ingredients[11] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[11]}</li>
                        <li class="${!data.ingredients[12] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[12]}</li>
                        <li class="${!data.ingredients[13] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[13]}</li>
                        <li class="${!data.ingredients[14] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[14]}</li>
                        <li class="${!data.ingredients[15] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[15]}</li>
                        <li class="${!data.ingredients[16] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[16]}</li>
                        <li class="${!data.ingredients[17] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[17]}</li>
                        <li class="${!data.ingredients[18] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[18]}</li>
                        <li class="${!data.ingredients[19] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[19]}</li>
                        <li class="${!data.ingredients[20] && "hide"}"> <input type="checkbox">&nbsp${data.ingredients[20]}</li>
                    </ul>
                </div>
            </div>
`;
  });
