const mealType = new URLSearchParams(document.location.search).get("mealType");

const productContainer = document.querySelector(".product_list_container");
let endPoint = "https://dummyjson.com/recipes";

if (mealType) {
  endPoint = `https://dummyjson.com/recipes/meal-type/${mealType}`;
}

const mealTypeText = document.querySelector(".category_title");

mealTypeText.innerHTML = `
${mealType}
`;

const search = document.querySelector(".search");

function getValue() {
  // Get the input value
  let inputValue = document.getElementById("search_result").value;
  console.log("Input Value:", inputValue);
  endPoint = `https://dummyjson.com/recipes/search?q=${inputValue}`;
  console.log("endPoint ", endPoint);
  loadData();
}

search.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getValue();
  }
});

// drop down menu og filtrering
const selectElement = document.querySelector("#cuisine_filter");

loadData();

function loadData() {
  fetch(endPoint)
    .then((response) => response.json())
    .then((data) => {
      showList(data.recipes);
    });
}

selectElement.addEventListener("change", (event) => {
  let cusine = event.target.value;
  if (cusine == "All") {
    endPoint = "https://dummyjson.com/recipes";
  } else {
    endPoint = `https://dummyjson.com/recipes/tag/${cusine}`;
  }

  console.log("endPoint ", endPoint);
  loadData();

  document.querySelector(".category_title").textContent = `${cusine}`;
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


                <h2 class="meal_name">${product.name}</h2>
                <div class="text">
                    <p>Mealtype: ${product.mealType} </p>
                <p>Cooking time: ${product.prepTimeMinutes + product.cookTimeMinutes}min.</p>
                <p>Difficulty: ${product.difficulty}</p>
                <p>Servings: ${product.servings} </p>
            </div>
            <div>
                <a class="toRecepe" href="opskrift.html?id=${product.id}">
                    To recipe
                </a>
            </div>
        </div>
    </div>`
    )
    .join("");

  productContainer.innerHTML = markup;
}
