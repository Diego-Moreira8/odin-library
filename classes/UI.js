import Library from "./Library.js";

class UI {
  constructor() {
    this.library = new Library();

    this.library.addBook(
      "O Último Desejo",
      "Andrzej Sapkowski",
      300,
      true,
      300
    );
    this.library.addBook(
      "A Espada do Destino",
      "Andrzej Sapkowski",
      400,
      true,
      400
    );
    this.library.addBook(
      "O Sangue dos Elfos",
      "Andrzej Sapkowski",
      400,
      false,
      40
    );

    this.start();
  }

  start() {
    const addBookForm = document.querySelector("form");
    addBookForm.addEventListener("submit", (e) => this.handleAddBook(e));

    this.update();
  }

  update() {
    const booksList = document.querySelector("#books-list");

    booksList.innerHTML = "";

    for (let book of this.library.getBooks()) {
      const fragment = document.createDocumentFragment();
      const bookBtn = document.createElement("button");
      const titleDiv = document.createElement("div");
      const authorDiv = document.createElement("div");

      titleDiv.textContent = `${book.getTitle()}`;
      authorDiv.textContent = `${book.getAuthor()}`;

      [titleDiv, authorDiv].forEach((el) => bookBtn.appendChild(el));
      fragment.appendChild(document.createElement("li")).appendChild(bookBtn);
      booksList.appendChild(fragment);
    }
  }

  handleAddBook(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const { title, author, totalPages, read, readPages } = formData;
    this.library.addBook(title, author, totalPages, !!read, readPages);
    this.update();
  }
}

export default UI;
