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

// Je créer 2 fonctions qui permettrons de supprimer ou check

// Trash
function trash() {
  // console.log(this);
  // Je récupère l'élément parent de mon bouton trash
  this.parentNode.parentNode.remove();
}

// Check
function check() {
  // Operateur ternaire
  //console.log(this);
  this.innerHTML = this.innerHTML === "✅" ? "❌" : "✅";
}

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

  // Ici, je récupère l'info de button et en fonction je trash ou je check
  // console.log(li.children[1].children[0]);
  li.children[1].children.trash.onclick = trash;
  li.children[1].children.check.onclick = check;
}

function createItem(event) {
  // je stoppe le comportement par défaut du formulaire
  event.preventDefault();

  // Je dois identifier de maninière unique ma task
  // Alors je lui ajoute un Date.now()
  const timestamp = Date.now();
  // Je créer un objet avec ma task
  // La notation [] permet de créer une clé dynamiquement
  todoList[timestamp] = {
    // je créer le même objet que dans l'exemple avec
    // en plus savoir si c'est coché ou pas
    todo: INPUT_TODO.value,
    checked: false,
  };

  createHTML(todoList[timestamp].todo);

  // console.log(todoList);
  /**
   * output:
   * 1665049634136 : {todo: 'hello wilders!', checked: false}
   * todo1 : {todo: 'Faire à manger'}
   * todo2 : {todo: 'Faire la vaisselle'}
   * todo3 : {todo: 'Faire des vidéos'}
   *
   */
  // Je vide mon input
  INPUT_TODO.value = "";
}

// et je l'utilise ici
window.addEventListener("load", loadData);
FORM.addEventListener("submit", createItem);
