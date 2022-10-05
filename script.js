const bookArea = document.querySelector(".books-area");
const addBook = document.querySelector(".add-book");

addBook.addEventListener("submit", addToMyLibrary);

// Modal
const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close-modal");
const modalOverlay = document.getElementById("overlay");

openModalButton.addEventListener("click", () => {
  modalOverlay.classList.add("active");
  addBook.classList.add("active");
});

closeModalButton.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
function closeModal() {
  modalOverlay.classList.remove("active");
  addBook.classList.remove("active");
}

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this._title = title;
    this._author = author;
    this._pages = pages;
    this._read = read;
  }

  get title() {
    return this._title;
  }
  get author() {
    return this._author;
  }
  get pages() {
    return this._pages;
  }
  get read() {
    return this._read;
  }
}

function addToMyLibrary(e) {
  e.preventDefault();
  let title = addBook.title.value,
    author = addBook.author.value,
    pages = addBook.pages.value,
    read = addBook.read.checked;
  myLibrary.push(new Book(title, author, pages, read));
  refreshBookArea();
  closeModal();
}

function refreshBookArea() {
  bookArea.innerHTML = ""; // Clear before adds
  bookArea.appendChild(openModalButton);
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
    pages.textContent = `${book.pages} páginas`;

    const read = document.createElement("div");
    read.classList.add("book-read");
    const readLabel = document.createElement("label");
    readLabel.textContent = "Lido";
    // Criates a unique ID for the label/input
    readLabel.setAttribute("for", `book${myLibrary.indexOf(book)}-checkbox`);
    const readCheckBox = document.createElement("input");
    readCheckBox.setAttribute("id", `book${myLibrary.indexOf(book)}-checkbox`);
    readCheckBox.setAttribute("type", "checkbox");
    // Class for the event listener
    readCheckBox.classList.add("read-status");
    // Checks if the book is read
    if (book.read) readCheckBox.checked = true;
    // Append on the read div
    read.appendChild(readLabel);
    read.appendChild(readCheckBox);

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
  const readStatus = document.querySelectorAll(".read-status");
  readStatus.forEach((button) =>
    button.addEventListener("change", changeReadStatus)
  );
}

function removeBook(e) {
  const bookIndex = e.target.parentElement.getAttribute("data-book-index");
  myLibrary.splice(bookIndex, 1);
  refreshBookArea();
}

function changeReadStatus(e) {
  const bookIndex =
    e.target.parentElement.parentElement.getAttribute("data-book-index");
  myLibrary[bookIndex].read = e.target.checked;
  refreshBookArea();
}
