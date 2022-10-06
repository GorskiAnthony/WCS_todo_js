// Je récupère toutes les informations depuis mon HTML dont j'ai besoins.
const FORM = document.querySelector("form");
const INPUT = document.querySelector(".insertTodo");
const LISTS = document.querySelector(".lists");

let todoList = {};

/**
 * Je vais persister mes to do
 */

function saveToDo() {
  // doc: https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
  // doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  localStorage.setItem("todo", JSON.stringify(todoList));
}

/**
 * Je créer une fonction pour delete un élément && je créer une fonction pour check l'élément
 */

function trash() {
  // doc: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this
  /*
  console.log("trash");
  console.log(this);*/
  this.parentNode.parentNode.remove();

  // je recupere data-id
  const todoToDelete = this.parentNode.parentNode.getAttribute("data-id");

  // doc: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/delete
  delete todoList[todoToDelete];

  saveToDo();
}

function check() {
  // doc: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this
  /*
  console.log("check");
  console.log(this);*/

  this.innerHTML = this.innerHTML === "✅" ? "❌" : "✅";

  const span = this.parentNode.parentNode.children[0];
  span.classList.toggle("done");

  const todoChecked = this.parentNode.parentNode.getAttribute("data-id");
  todoList[todoChecked].isChecked = !todoList[todoChecked].isChecked;

  saveToDo();
}

/**
 * La fonction loadData permet d'aller chercher des informations une fois le dom chargé
 * */

const loadData = () => {
  // console.log("Je suis load!");
  // doc: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // doc: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

  // Si je n'ai pas d'info dans le localStorage, file ! 🧹
  if (!localStorage.getItem("todo")) return;

  // doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
  const todo = JSON.parse(localStorage.getItem("todo"));

  todoList = todo;

  Object.keys(todoList).map((key) => templateHTML(todoList[key], key));
};

window.addEventListener("load", loadData);

/**
 * La fonction templateHTML permet de créer 1 li avec les informations passer en paramètre.
 */
function templateHTML(todo, key) {
  // si pas de to do, tu return
  if (!todo) return;

  // template HTML pour chaque to do
  const html = `
  <span class="${todo.isChecked ? "done" : ""}" >${todo.to_do}</span>
    <span>
     <button name="trash" class="trash"><i class="fas fa-trash-alt"></i></button>
     <button name="check" class="check">${todo.isChecked ? "❌" : "✅"}</button>
    </span>
  `;

  // doc : https://developer.mozilla.org/fr/docs/Web/API/Document/createElement
  const li = document.createElement("li");
  // doc: https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
  li.setAttribute("data-id", key);
  li.innerHTML = html;
  /*
  <li>
    <span>to do</span>
    <span>
     <button name="trash" class="trash"><i class="fas fa-trash-alt"></i></button>
     <button name="check" class="check">✅</button>
    </span>
  </li>
   */

  // doc: https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
  LISTS.insertBefore(li, LISTS.firstChild);
  li.children[1].children.trash.onclick = trash;
  li.children[1].children.check.onclick = check;
}

/**
 * La fonction allTodo permet d'afficher toutes les todos
 */

function allTodo(event) {
  console.log(todoList);

  // je stoppe le comportement par défaut du FORM
  // doc: https://developer.mozilla.org/fr/docs/Web/API/Event/preventDefault
  event.preventDefault();

  if (INPUT.value) {
    // Je récupère mon timestamp = ma valeur unique de mon li
    const timestamp = Date.now();
    // Je push cette info dans ma todoList
    todoList[timestamp] = {
      to_do: INPUT.value,
      isChecked: false,
    };
    // j'affiche la TO DO
    templateHTML(todoList[timestamp], timestamp);
    saveToDo();
  } else {
    alert("Hop, pas de message ! 🚔");
  }

  INPUT.value = "";
}

/**
 * Soumission d'une to do
 */
FORM.addEventListener("submit", allTodo);
