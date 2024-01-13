import Library from "./Library.js";

class UI {
  constructor() {
    this.library = new Library();

    this.library.addBook("O Último Desejo", "Andrzej Sapkowski", 5, true, 5);
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
    const addBookBtn = document.querySelector(".open-add-book-form");

    addBookBtn.addEventListener("click", () => this.openAddBookForm());
    this.addFormValidation();
    this.refreshBooksList();
  }

  refreshBooksList() {
    const booksList = document.querySelector("#books-list");

    booksList.innerHTML = "";

    for (let book of this.library.getBooks()) {
      const fragment = document.createDocumentFragment();
      const bookBtn = document.createElement("button");
      const titleDiv = document.createElement("div");
      const authorDiv = document.createElement("div");

      bookBtn.addEventListener("click", () => this.openBookDetails(book));
      titleDiv.textContent = `${book.getTitle()}`;
      authorDiv.textContent = `${book.getAuthor()}`;

      [titleDiv, authorDiv].forEach((el) => bookBtn.appendChild(el));
      fragment.appendChild(document.createElement("li")).appendChild(bookBtn);
      booksList.appendChild(fragment);
    }
  }

  openAddBookForm() {
    const overlay = document.querySelector(".overlay");
    const form = document.querySelector("form#add-book");
    const title = document.querySelector("#title");
    const readPages = document.querySelector("#read-pages");
    const cancelBtn = document.querySelector(".cancel-add-book");

    const closeAddBook = () => {
      [overlay, cancelBtn].forEach((el) => {
        el.removeEventListener("click", closeAddBook);
      });
      [overlay, form].forEach((el) => el.classList.remove("active"));
    };

    const handleAddBook = (e) => {
      e.preventDefault();
      closeAddBook();

      const formData = Object.fromEntries(new FormData(form));
      const { title, author, totalPages, read, readPages } = formData;

      this.library.addBook(title, author, totalPages, !!read, readPages);
      this.refreshBooksList();
    };

    [overlay, form].forEach((el) => el.classList.add("active"));

    form.reset();
    // The custom form validation can leave the #read-pages input disabled
    readPages.disabled = false;
    title.focus();

    [overlay, cancelBtn].forEach((el) => {
      el.addEventListener("click", closeAddBook);
    });

    form.addEventListener("submit", handleAddBook, { once: true });
  }

  addFormValidation() {
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
        readPages.setCustomValidity("");
      }

      totalPages.reportValidity();
    });

    readCheck.addEventListener("change", () => {
      readPages.value = readCheck.checked ? totalPages.value : 0;
      readPages.disabled = readCheck.checked;
    });

    readPages.addEventListener("input", () => {
      if (totalPages.value < readPages.value) {
        readPages.setCustomValidity(
          "O total de páginas não pode ser menor que as páginas lidas!"
        );
      } else {
        totalPages.reportValidity();

        readPages.setCustomValidity("");
      }

      readPages.reportValidity();
    });
  }

  openBookDetails(book) {
    const overlay = document.querySelector(".overlay");
    const bookDetails = document.querySelector("#book-details");
    const titleDiv = document.querySelector("#book-details .title");
    const authorDiv = document.querySelector("#book-details .author");
    const pagesReadInput = document.querySelector("#edit-read-pages");
    const pagesReadControls = document.querySelectorAll(
      "#book-details .pages-read button"
    );
    const closeBookDetailsElements = document.querySelectorAll(
      ".close-book-details"
    );

    [overlay, bookDetails].forEach((el) => el.classList.add("active"));

    titleDiv.textContent = book.getTitle();
    authorDiv.textContent = book.getAuthor();
    pagesReadInput.value = book.getReadPages();

    const handleSetReadPages = (e) => {
      book.setReadPages(
        e.target.className === "increment"
          ? book.getReadPages() + 1
          : book.getReadPages() - 1
      );
      pagesReadInput.value = book.getReadPages();
    };

    pagesReadControls.forEach((btn) =>
      btn.addEventListener("click", handleSetReadPages)
    );

    closeBookDetailsElements.forEach((el) => {
      el.addEventListener(
        "click",
        () => {
          console.log("close");
          pagesReadControls.forEach((btn) =>
            btn.removeEventListener("click", handleSetReadPages)
          );
          bookDetails.classList.remove("active");
        },
        { once: true }
      );
    });
  }
}

export default UI;
