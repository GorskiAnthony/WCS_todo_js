/** Get information depuis le DOM */
const FORM = document.querySelector("form");
const INPUT_TODO = document.querySelector(".insertTodo");
const LISTS = document.querySelector(".lists");

let todoList = {};

// J'attend que mon ma page soit en load et je lance ma fonction
// doc : https://developer.mozilla.org/fr/docs/Web/API/Window/load_event
window.addEventListener("load", loadData);

// Sur mon form des qu'il y a un submit, je lance la fonction createItem
FORM.addEventListener("submit", createItem);

/** Mes fonctions **/

// Trash
function trash() {
  // Je récupère le parent du parent, et je le remove
  this.parentNode.parentNode.remove();
  // Je récupère l'id passer au front
  const key = this.parentNode.parentNode.getAttribute("data-id");
  // et le delete de mon objet todolist
  delete todoList[key];
  // Je save l'info
  saveData();
}

// Check
function check() {
  // Operateur ternaire
  // doc : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  this.innerHTML = this.innerHTML === "✅" ? "❌" : "✅";
  // Je récupère ma span et lui injecte mon css
  const span = this.parentNode.parentNode.children[0];
  span.classList.toggle("done");
  // Je récupère la clé, et selon son état, je lui indique je met l'inverse.
  const key = this.parentNode.parentNode.getAttribute("data-id");
  todoList[key].checked = !todoList[key].checked;
  // J'enregistre les infos
  saveData();
}

// Le localStorage, celui ci permet d'enregistrer les infos dans la memoire de l'ordi
function saveData() {
  window.localStorage.setItem("data", JSON.stringify(todoList));
}

// La fonction loadData, permet d'aller récupèrer les infos du localstorage et de les restituer dans le DOM
function loadData() {
  console.log("Je suis load !");
  // Si j'ai rien dans mon local storage, tu retournes
  if (!window.localStorage.getItem("data")) return;

  // Sinon, tu récupères les info et tu les mets dans data
  const data = JSON.parse(window.localStorage.getItem("data"));
  todoList = data;
  // J'utilise le .map() pour restituer chaque taches
  // doc : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  Object.keys(todoList).map((key) => createHTML(todoList[key], key));
}

// Creation de HTML
function createHTML(todo, key) {
  // Si pas de data, return
  if (!todo.todo) return;

  const html = `
  <span class="${todo.checked ? "done" : ""}">${todo.todo}</span>
  <span>
    <button name="trash" class="trash"><i class="fas fa-trash-alt"></i></button>
    <button name="check" class="check">${todo.checked ? "❌" : "✅"}</button>
  </span>
  `;

  // Ici, j'informe que
  const li = document.createElement("li");
  // J'ajoute l'id à mon li pour le reconnaitre
  li.setAttribute("data-id", key);
  li.innerHTML = html;
  // doc : https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
  LISTS.insertBefore(li, LISTS.firstChild);

  // Permet de voir le contenu pour comprendre de quoi il est composé
  // console.log(li.children[1].children.trash);
  li.children[1].children.trash.onclick = trash;
  li.children[1].children.check.onclick = check;
}

// Creer un item
function createItem(event) {
  event.preventDefault();

  // Si c'est pas vide
  if (INPUT_TODO.value) {
    // Permet de donner un ID unique
    const timestamp = Date.now();
    // Et je lui donne les info
    todoList[timestamp] = {
      todo: INPUT_TODO.value,
      checked: false,
    };

    // Je fait appel a la fonction createHTML
    createHTML(todoList[timestamp], timestamp);

    // Je save le changement
    saveData();
  }
  // Je reset l'input
  INPUT_TODO.value = "";
}
