const productContainer = document.querySelector(".product_list_container");
let endPoint = "https://dummyjson.com/recipes";

const search = document.querySelector(".search");

function getValue() {
  // Get the input value
  let inputValue = document.getElementById("search_result").value;
  console.log("Input Value:", inputValue);
  endPoint = endPoint = `https://dummyjson.com/recipes/search?q=${inputValue}`;
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

  // window.location.href = `opskriftliste.html?cuisine=${event.target.value}`;
  console.log("endPoint ", endPoint);
  loadData();
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
