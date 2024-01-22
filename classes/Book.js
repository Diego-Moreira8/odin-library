class Book {
  constructor(id, title, author, totalPages, readPages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.readPages = readPages;
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
    } else {
      console.error("Invalid read pages amount");
    }

    this.read = this.setReadStatus();
  };

  setTotalPages = (newAmount) => {
    if (typeof newAmount === "string") newAmount = parseInt(newAmount);

    if (newAmount > 0 && this.totalPages >= this.readPages) {
      this.totalPages = newAmount;
    } else {
      console.error("Invalid total pages amount");
    }

    this.read = this.setReadStatus();
  };

  setReadStatus = () => (this.read = this.readPages === this.totalPages);
}

export default Book;
