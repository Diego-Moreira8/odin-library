import Library from "./Library.js";

class UI {
  constructor() {
    this.library = new Library();

    this.library.addBook("a", "b", 10, true, 10);
    this.library.addBook("b", "b", 10, false, 5);
    this.library.addBook("c", "b", 100, true, 10);
    this.library.addBook("d", "b", 10, true, 10);
    this.library.addBook("e", "b", 10, false, 100);

    this.update();
  }

  update() {
    const booksList = document.querySelector("#books-list");
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
}

export default UI;
