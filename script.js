const bookArea = document.querySelector(".books-area");
const addBook = document.querySelector(".add-book");

addBook.addEventListener("submit", addToMyLibrary);

let myLibrary = [];

function Book(title, author, pages, read, indexOnLibrary) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addToMyLibrary(e) {
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
    // Create a new book card
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    // Add a custom attribute to identify the index
    bookCard.setAttribute("data-book-index", myLibrary.indexOf(book));
    // Create the book's details
    const title = document.createElement("div");
    title.classList.add("book-title");
    title.textContent = `${book.title}`;

    const author = document.createElement("div");
    author.classList.add("book-author");
    author.textContent = `${book.author}`;

    const pages = document.createElement("div");
    pages.classList.add("book-pages");
    pages.textContent = `${book.pages}`;

    const read = document.createElement("div");
    read.classList.add("book-read");
    read.textContent = `${book.read}`;

    const removeBookButton = document.createElement("button");
    removeBookButton.type = "button";
    removeBookButton.classList.add("remove-book");
    removeBookButton.textContent = "Apagar";
    // Append them on the book-card
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(removeBookButton);
    // Append book-card on the book-area
    bookArea.appendChild(bookCard);
  }
  // Add event to all buttons created
  const removeBookButtons = document.querySelectorAll(".remove-book");
  removeBookButtons.forEach((button) =>
    button.addEventListener("click", removeBook)
  );
}

function removeBook(e) {
  const bookIndex = e.target.parentElement.getAttribute("data-book-index");
  myLibrary.splice(bookIndex, 1);
  refreshBookArea();
}
