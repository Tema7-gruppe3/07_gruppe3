const productContainer = document.querySelector(".product_list_container");

const myCuisine = new URLSearchParams(window.location.search).get("cuisine");

// drop down menu og filtrering
const selectElement = document.querySelector("#cuisine_filter");

loadData(myCuisine);

function loadData(cusine) {
  fetch(`https://dummyjson.com/recipes/tag/${cusine}`)
    .then((response) => response.json())
    .then((data) => {
      showList(data.recipes);
    });
}

selectElement.addEventListener("change", (event) => {
  console.log("value", event.target.value);
  window.location.href = `opskriftliste.html?cuisine=${event.target.value}`;
  loadData(event.target.value);
});

function showList(products) {
  console.log(products);
  const markup = products
    .map(
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

  productContainer.innerHTML = markup;
}
