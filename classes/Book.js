class Book {
  constructor(id, title, author, totalPages, read, readPages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.read = read;
    this.readPages = read ? totalPages : readPages;
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

export default Book;
