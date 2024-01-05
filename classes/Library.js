import Book from "./Book.js";

class Library {
  constructor() {
    this.books = [];
    this.id = 0;
  }

  getBooks = () => this.books;

  getBook = (id) => this.books.find((book) => book.id === id);

  addBook(title, author, totalPages, read, readPages) {
    this.books.push(
      new Book(this.id, title, author, totalPages, read, readPages)
    );
    this.id++;
  }

  deleteBook(id) {
    this.books = [...this.books.filter((book) => book.id !== id)];
  }
}

export default Library;
