const bookArea = document.querySelector(".books-area");
const addBook = document.querySelector(".add-book");

addBook.addEventListener("submit", addToLibrary);

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addToLibrary(e) {
  e.preventDefault();
  let title = addBook.title.value,
    author = addBook.author.value,
    pages = addBook.pages.value,
    read = addBook.read.checked;
  myLibrary.push(new Book(title, author, pages, read));
  refreshBookArea();
}

function refreshBookArea() {
  bookArea.innerHTML = ""; // Clear before adds
  for (let book of myLibrary) {
    bookArea.innerHTML += `<div class="book">
    <div class="book-title">${book.title}</div>
    <div class="book-author">${book.author}</div>
    <div class="book-pages">${book.pages}</div>
    <div class="book-read">${book.read}</div>
    </div>`;
  }
}
