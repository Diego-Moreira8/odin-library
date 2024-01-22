import Book from "./Book.js";

class Library {
  constructor() {
    this.books = [];
    this.nextBookId = 0;
    this.getLocalStorage();
  }

  getBooks = () => this.books;

  getBook = (id) => this.books.find((book) => book.id === id);

  addBook(title, author, totalPages, readPages) {
    this.books.push(
      new Book(this.nextBookId, title, author, totalPages, readPages)
    );
    this.nextBookId++;

    this.updateLocalStorage();
  }

  deleteBook(id) {
    this.books = [...this.books.filter((book) => book.id !== id)];
  }

  getLocalStorage() {
    const userLibrary = JSON.parse(localStorage.getItem("userLibrary"));
    if (userLibrary) {
      userLibrary.forEach((book) => {
        const { title, author, totalPages, readPages } = book;
        this.addBook(title, author, totalPages, readPages);
      });
    }
  }

  updateLocalStorage() {
    localStorage.setItem("userLibrary", JSON.stringify(this.books));
  }
}

export default Library;
