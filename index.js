console.log("index loaded");

const kategori_list_container = document.querySelector(".menu");
fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((data) => showCategory(data));

function showCategory(categories) {
  console.log("Mine data er", categories);
  const markup = categories

    .map(
      (category) =>
        ` 
                   <li> <a href="opskriftliste.html?category=${category.mealType}">Breakfast</a></li>
                <li> <a href="opskriftliste.html?mealType=Lunch">Lunch</a></li>
                <li> <a href="opskriftliste.html?mealType=Dinner">Dinner</a></li>
                <li> <a href="opskriftliste.html?mealType=Dessert">Dessert</a></li>

`
    )
    .join("");
  console.log("Min markup er", markup);

  kategori_list_container.innerHTML = markup;
}

<a href="opskriftliste.html?category=${category.mealType}" class="categories"></a>;
