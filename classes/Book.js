class Book {
  constructor(id, title, author, totalPages, read, readPages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.readPages = read ? totalPages : readPages;
    this.read = this.setReadStatus();
  }

  getId = () => this.id;
  getTitle = () => this.title;
  getAuthor = () => this.author;
  getTotalPages = () => this.totalPages;
  getRead = () => this.read;
  getReadPages = () => this.readPages;

  setTitle = (newTitle) => (this.title = newTitle);

  setAuthor = (newAuthor) => (this.author = newAuthor);

  setReadPages = (newAmount) => {
    if (typeof newAmount === "string") newAmount = parseInt(newAmount);

    if (newAmount >= 0 && newAmount <= this.totalPages) {
      this.readPages = newAmount;
    }

    this.read = this.setReadStatus();
  };

  setTotalPages = (newAmount) => {
    console.log(newAmount);
    if (typeof newAmount === "string") newAmount = parseInt(newAmount);

    if (this.totalPages >= this.readPages) {
      this.totalPages = newAmount;
    }

    this.read = this.setReadStatus();
  };

  setReadStatus = () => (this.read = this.readPages === this.totalPages);
}

export default Book;
