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

    addBookBtn.addEventListener("click", () => this.openBookForm());
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

  openBookForm(book) {
    const overlay = document.querySelector(".overlay");
    const form = document.querySelector("form#add-book");
    const legend = form.querySelector("legend");
    const title = form.querySelector("#title");
    const author = form.querySelector("#author");
    const totalPages = form.querySelector("#total-pages");
    const readCheck = form.querySelector("#read-check");
    const readPages = form.querySelector("#read-pages");
    const cancelBtn = form.querySelector(".cancel-add-book");
    const submitBtn = form.querySelector("button[type='submit']");

    const closeAddBook = () => {
      [overlay, cancelBtn].forEach((el) => {
        el.removeEventListener("click", closeAddBook);
      });
      form.removeEventListener("submit", handleSubmit);
      [overlay, form].forEach((el) => el.classList.remove("active"));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      closeAddBook();

      const formData = Object.fromEntries(new FormData(form));
      const { title, author, totalPages, read, readPages } = formData;

      if (book) {
        book.setTitle(title);
        book.setAuthor(author);
        book.setTotalPages(totalPages);
        book.setReadPages(readPages);
        this.openBookDetails(book);
      } else {
        this.library.addBook(title, author, totalPages, !!read, readPages);
      }

      this.refreshBooksList();
    };

    [overlay, form].forEach((el) => el.classList.add("active"));

    legend.textContent = book ? "Editar livro" : "Adicionar livro";
    submitBtn.textContent = book ? "Salvar alterações" : "Salvar livro";

    form.reset();
    // The custom form validation can leave the #read-pages input disabled
    readPages.disabled = false;
    title.focus();

    [overlay, cancelBtn].forEach((el) => {
      el.addEventListener("click", closeAddBook);
    });

    form.addEventListener("submit", handleSubmit);

    if (book) {
      title.value = book.getTitle();
      author.value = book.getAuthor();
      totalPages.value = book.getTotalPages();
      readCheck.checked = book.getRead();
      readPages.value = book.getReadPages();
    }
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
    const closeBtn = bookDetails.querySelector(".close-book-details");
    const title = bookDetails.querySelector(".title");
    const author = bookDetails.querySelector(".author");
    const decrement = bookDetails.querySelector(".decrement");
    const input = bookDetails.querySelector("input");
    const increment = bookDetails.querySelector(".increment");
    const deleteBtn = bookDetails.querySelector(".delete-book");
    const editBtn = bookDetails.querySelector(".edit-book");
    const popup = bookDetails.querySelector(".delete-book-popup");

    const closeAddBook = () => {
      [(overlay, closeBtn)].forEach((el) => {
        el.removeEventListener("click", closeAddBook);
      });
      [decrement, increment].forEach((btn) =>
        btn.removeEventListener("click", changeReadPages)
      );
      deleteBtn.removeEventListener("click", handleDeleteBook);
      editBtn.removeEventListener("click", handleEditBook);
      input
        .removeEventListener("change", changeReadPages)

        [(overlay, bookDetails, popup)].forEach((el) =>
          el.classList.remove("active")
        );
    };

    const changeReadPages = (e) => {
      if (e.type === "click") {
        const isIncrementing = e.target.classList.contains("increment");
        book.setReadPages(book.getReadPages() + (isIncrementing ? 1 : -1));
      } else {
        book.setReadPages(parseInt(input.value));
      }

      input.value = book.getReadPages();
    };

    const handleEditBook = () => {
      closeAddBook();
      this.openBookForm(book);
    };

    const handleDeleteBook = () => {
      const confirmDelete = bookDetails.querySelector(".confirm-delete");
      const cancelDelete = bookDetails.querySelector(".cancel-delete");

      popup.classList.add("active");

      confirmDelete.addEventListener(
        "click",
        () => {
          this.library.deleteBook(book.getId());
          popup.classList.remove("active");
          closeAddBook();
          this.refreshBooksList();
        },
        { once: true }
      );

      cancelDelete.addEventListener(
        "click",
        () => {
          popup.classList.remove("active");
        },
        { once: true }
      );
    };

    [overlay, bookDetails].forEach((el) => el.classList.add("active"));

    [overlay, closeBtn].forEach((el) => {
      el.addEventListener("click", closeAddBook);
    });

    title.textContent = book.getTitle();
    author.textContent = book.getAuthor();
    input.value = book.getReadPages();

    [decrement, increment].forEach((btn) => {
      btn.addEventListener("click", changeReadPages);
    });

    input.addEventListener("change", changeReadPages);

    deleteBtn.addEventListener("click", handleDeleteBook);
    editBtn.addEventListener("click", handleEditBook);
  }
}

export default UI;
