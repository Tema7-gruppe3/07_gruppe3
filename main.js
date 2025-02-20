// Her er vores script til burgermenu
//Vi bruger querySelector til at vælge HTML-elementerne:
//burgerikonet
const burger = document.querySelector(".burger");
//navigation
const nav = document.querySelector("nav");
//menulisten med links
const menu = document.querySelector(".menu");

//når brugeren klikker på burgeren, kaldes funktionen burgerClick.
burger.addEventListener("click", burgerClick);

function burgerClick() {
  // tilføjer eller fjerner klassen active på burgeren og navigationen.
  burger.classList.toggle("active");
  nav.classList.toggle("active");
}
//der bliver lyttet efter når der klikkes i menuen
menu.addEventListener("click", menuClick);
//Når brugeren vælger et link i menuen, fjernes active-klassen fra både burgeren og navigationen.
function menuClick() {
  burger.classList.remove("active");
  nav.classList.remove("active");
}
