import Library from "./Library.js";

class UI {
  constructor() {
    this.library = new Library();

    // this.library.addBook("a", "b", 10, true, 10);
    // this.library.addBook("b", "b", 10, false, 5);
    // this.library.addBook("c", "b", 100, true, 10);
    // this.library.addBook("d", "b", 10, true, 10);
    // this.library.addBook("e", "b", 10, false, 100);

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
      const li = document.createElement("li");
      li.textContent = `
        ${book.getTitle()} --
        ${book.getAuthor()} --
        ${book.getTotalPages()} --
        ${book.getRead()} --
        ${book.getReadPages()} 
      `;
      booksList.appendChild(li);
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
