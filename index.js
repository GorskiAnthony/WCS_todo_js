/** Je récupère mes informations depuis le DOM */
const FORM = document.querySelector("form");
const INPUT_TODO = document.querySelector(".insertTodo");
const LISTS = document.querySelector(".lists");

// Ajout des taches en dur pour les tests, c'est plus facile pour débugguer
let todoList = {
  todo1: {
    todo: "Faire à manger",
  },
  todo2: {
    todo: "Faire la vaisselle",
  },
  todo3: {
    todo: "Faire des vidéos",
  },
};

// loadData() permet de chargé les informations une fois le DOM chargé
function loadData() {
  console.log("Je suis load !");
  Object.keys(todoList).map((key) => createHTML(todoList[key].todo));
}

// Je créer une fonction pour créer ma liste de to do dans mon HTML
function createHTML(todo) {
  /** Si pas de todo, je ne fais rien, donc return **/
  if (!todo) return;

  const html = `
  <span>${todo}</span>
  <span>
    <button name="trash" class="trash"><i class="fas fa-trash-alt"></i></button>
    <button name="check" class="check">✅</button>
  </span>
  `;

  // Ici, je créer un élément li
  // doc: https://developer.mozilla.org/fr/docs/Web/API/Document/createElement
  const li = document.createElement("li");
  // Je lui ajoute en HTLM ma variable html
  li.innerHTML = html;
  // Ici, j'ajoute à ma liste de to do, mon élément li avec son contenu
  // doc: https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
  // LISTS.firstChild = le premier enfant de LISTS
  LISTS.insertBefore(li, LISTS.firstChild);
}

function createItem(event) {
  // je stoppe le comportement par défaut du formulaire
  event.preventDefault();

  // Je récupère la valeur de mon input
  const todo = INPUT_TODO.value;
  createHTML(todo);

  // Je vide mon input
  INPUT_TODO.value = "";
}

// et je l'utilise ici
window.addEventListener("load", loadData);
FORM.addEventListener("submit", createItem);
