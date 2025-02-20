// Hent værdien af "mealType" fra URL'en
const mealType = new URLSearchParams(document.location.search).get("mealType");

// Vælg HTML-elementer, der skal bruges i scriptet
const productContainer = document.querySelector(".product_list_container");
let endPoint = "https://dummyjson.com/recipes";

// Hvis en "mealType" findes i URL'en, opdateres API-endpointet for kun at hente den type opskrifter
if (mealType) {
  endPoint = `https://dummyjson.com/recipes/meal-type/${mealType}`;
}

// Vælg elementet, der viser den aktuelle kategori
const categoryTitle = document.querySelector(".category_title");

// Sætter kategorititlen til enten den valgte "mealType" eller "All", hvis ingen er valgt
categoryTitle.innerHTML = `
${mealType ? mealType : "All"}
`;

// henter søgefeltet
const search = document.querySelector(".search");

// Funktion til at håndtere søgninger
function getValue() {
  // Get the input value
  let inputValue = document.getElementById("search_result").value;
  console.log("Input Value:", inputValue);

  // // Opdater titlen til at matche søgningen
  categoryTitle.innerHTML = `
${inputValue}
`;
  // Opdater API-endpointet til at inkludere søgningen
  endPoint = `https://dummyjson.com/recipes/search?q=${inputValue}`;
  console.log("endPoint ", endPoint);
  // Hent data baseret på den nye søgning
  loadData();
}

// Lyt efter tryk på ENTER (keyCode 13) i søgefeltet og aktiver søgningen
search.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Forhindre standard ENTER-handling
    getValue();
  }
});

// drop down menu og filtrering
const selectElement = document.querySelector("#cuisine_filter");

// Hent data fra API'et, når siden indlæses
loadData();

// Funktion til at hente data fra API'et og vise opskrifter
function loadData() {
  fetch(endPoint) // Hent data fra det aktuelle endpoint
    .then((response) => response.json())
    .then((data) => {
      showList(data.recipes); // Send de hentede opskrifter til "showList"-funktionen
    });
}

// Lyt efter ændringer i dropdown-menuen og filtrér opskrifterne
selectElement.addEventListener("change", (event) => {
  let cusine = event.target.value; // Hent den valgte værdi

  // Hvis brugeren vælger "All", vises alle opskrifter
  if (cusine == "All") {
    endPoint = "https://dummyjson.com/recipes";
  } else {
    // Opdater API-endpointet for at vise opskrifter fra det valgte køkken
    endPoint = `https://dummyjson.com/recipes/tag/${cusine}`;
  }

  console.log("endPoint ", endPoint);
  loadData(); // Hent data baseret på den nye filtrering

  // Opdater kategorititlen til det valgte køkken
  document.querySelector(".category_title").textContent = `${cusine}`;
});

// Funktion til at vise opskrifterne i HTML
function showList(products) {
  console.log(products);
  // Opret HTML-markup til opskrifterne
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
