// Je récupère toutes les informations depuis mon HTML dont j'ai besoins.
const FORM = document.querySelector("form");
const INPUT = document.querySelector(".insertTodo");
const LISTS = document.querySelector(".lists");

let todoList = {
  todo1: {
    to_do: "Faire à manger",
  },
  todo2: {
    to_do: "Faire la vaisselle",
  },
  todo3: {
    to_do: "Faire une to do app",
  },
};

/**
 * La fonction loadData permet d'aller chercher des informations une fois le dom chargé
 * */

const loadData = () => {
  // console.log("Je suis load!");
  // doc: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // doc: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  Object.keys(todoList).map((key) => templateHTML(todoList[key]));
};

window.addEventListener("load", loadData);

/**
 * La fonction templateHTML permet de créer 1 li avec les informations passer en paramètre.
 */
function templateHTML(todo) {
  // si pas de to do, tu return
  if (!todo) return;

  // template HTML pour chaque to do
  const html = `
  <span>${todo.to_do}</span>
    <span>
     <button name="trash" class="trash"><i class="fas fa-trash-alt"></i></button>
     <button name="check" class="check">✅</button>
    </span>
  `;

  // doc : https://developer.mozilla.org/fr/docs/Web/API/Document/createElement
  const li = document.createElement("li");
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
}

/**
 * La fonction allTodo permet d'afficher toutes les todos
 */

function allTodo(event) {
  // je stoppe le comportement par défaut du FORM
  // doc: https://developer.mozilla.org/fr/docs/Web/API/Event/preventDefault
  event.preventDefault();

  // j'affiche la TO DO
  templateHTML(INPUT.value);

  INPUT.value = "";
}

/**
 * Soumission d'une to do
 */
FORM.addEventListener("submit", allTodo);
