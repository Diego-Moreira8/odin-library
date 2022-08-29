const bookArea = document.querySelector(".books-area");
const addBook = document.querySelector(".add-book");

addBook.addEventListener("click", addToLibrary);
addBook.addEventListener("click", refreshBookArea);

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addToLibrary() {
  myLibrary.push(new Book("asdf", "QWER", 23, true));
}

function refreshBookArea() {
  for (let book of myLibrary) {
    bookArea.innerHTML += `<div>${book.title}</div>`;
  }
}
