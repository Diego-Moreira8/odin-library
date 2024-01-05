class Book {
  constructor(id, title, author, totalPages, read, readPages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.read = read;
    this.readPages = this.read ? this.totalPages : readPages;
  }

  getTitle = () => this.title;
  getAuthor = () => this.author;
  getTotalPages = () => this.totalPages;
  getRead = () => this.read;
  getReadPages = () => this.readPages;

  setTitle = (newTitle) => (this.title = newTitle);

  setAuthor = (newAuthor) => (this.author = newAuthor);

  setReadPages = (newAmount) => {
    if (newAmount >= 0 && newAmount <= this.totalPages) {
      this.readPages = newAmount;
    }
    this.read = this.readPages === this.totalPages;
  };

  setTotalPages = (newAmount) => {
    if (this.totalPages < this.readPages) {
      this.totalPages = newAmount;
    }
    this.read = this.readPages === this.totalPages;
  };

  switchRead = () => {
    this.read = !this.read;
    if (this.read) this.readPages = this.totalPages;
  };
}

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

new UI();
