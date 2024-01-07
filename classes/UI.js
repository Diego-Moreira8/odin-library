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
    const closeAddBookElements = document.querySelectorAll(".close-add-book");
    const openAddBookElements = document.querySelectorAll(".open-add-book");

    this.formValidation();

    addBookForm.addEventListener("submit", (e) => {
      this.handleAddBook(e);
      this.closeAddBookForm();
    });

    closeAddBookElements.forEach((el) =>
      el.addEventListener("click", () => this.closeAddBookForm())
    );

    openAddBookElements.forEach((el) =>
      el.addEventListener("click", () => this.openAddBookForm())
    );

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

  openAddBookForm() {
    document.querySelector("form").reset();

    [
      document.querySelector(".overlay"),
      document.querySelector("form"),
    ].forEach((el) => el.classList.add("active"));

    document.querySelector("#title").focus();
  }

  closeAddBookForm() {
    [
      document.querySelector(".overlay"),
      document.querySelector("form"),
    ].forEach((el) => el.classList.remove("active"));

    document.querySelector("form").reset();

    document.querySelector("#read-pages").disabled = false;
  }

  formValidation() {
    const totalPages = document.querySelector("#total-pages");
    const readCheck = document.querySelector("#read-check");
    const readPages = document.querySelector("#read-pages");

    totalPages.addEventListener("input", () => {
      if (totalPages.value < readPages.value) {
        totalPages.setCustomValidity(
          "O total de páginas não pode ser menor que as páginas lidas!"
        );
      } else {
        totalPages.setCustomValidity("");
      }

      totalPages.reportValidity();
    });

    readCheck.addEventListener("change", () => {
      readPages.value = readCheck.checked ? totalPages.value : 0;
      readPages.disabled = readCheck.checked;
    });

    readPages.addEventListener("input", () => {
      if (readPages.value > totalPages.value) {
        readPages.setCustomValidity(
          "O total de páginas não pode ser menor que as páginas lidas!"
        );
      } else {
        readPages.setCustomValidity("");
      }

      readPages.reportValidity();
    });
  }
}

export default UI;
