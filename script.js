let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addToLibrary() {
  myLibrary.push(new Book("asdf", "QWER", 23, true));
  myLibrary.push(new Book("cbvn", "CCVX", 2456, true));
  myLibrary.push(new Book("tyiu", "MNMM", 897, false));
  myLibrary.push(new Book("dfgh", "RETT", 11, true));
}
