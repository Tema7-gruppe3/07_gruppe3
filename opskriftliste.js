const productContainer = document.querySelector(".product_list_container");

const myCuisine = new URLSearchParams(window.location.search).get("cuisine");

// drop down menu og filtrering
const selectElement = document.querySelector("#cuisine_filter");

loadData(myCuisine);

function loadData(cusine) {
  fetch(`https://dummyjson.com/recipes/tag/${cusine}`)
    .then((response) => response.json()) //then(så) henter den gyldig data som er jsonfil
    .then((data) => {
      showList(data.recipes);
    }); //then (så) kaldes funktionen og dataen/produkterne fetches og benyttes i følgende functions skriv
}

selectElement.addEventListener("change", (event) => {
  console.log("value", event.target.value);
  window.location.href = `opskriftliste.html?cuisine=${event.target.value}`;
  loadData(event.target.value);
});

function showList(products) {
  //data er ændret til products fordi vi har hentet datean og nu skal vi benyttes produktdataen fra dataen
  console.log(products);
  const markup = products
    .map(
      //products.map for hvert produkt (product =>) puttes et nyt produkt ind i variablen markup
      (product) =>
        `<div class="card">
            <a class="opskrift_billede" href="opskrift.html?id=${product.id}">
            <img class="opskriftbillede"
                        src="https://cdn.dummyjson.com/recipe-images/${product.id}.webp" alt="produktbillede">
                <img class="wave" src="wave.svg" alt="wave">
                </a>
            <div class="text">
                <h2>${product.name}</h2>
                <p>Cooking time: ${product.prepTimeMinutes + product.cookTimeMinutes}min.</p>
                <p>Difficulty: ${product.difficulty}</p>
                <p>Servings: ${product.servings} </p>
            </div>
            <div>
                <a class="toRecepe" href="opskrift.html">
                    To recipe
                </a>
            </div>
        </div>
    </div>`
    )
    .join("");
  // mellem listerne(array) er der komma, vha join vil der ikke være komma længere.
  productContainer.innerHTML = markup;
}
