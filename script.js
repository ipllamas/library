let myLibrary = [];
const main = document.querySelector('.main');

//modal pop up button and the modal itself
const modal = document.querySelector('.modal-inactive');
const modalBtn = document.querySelector('.modal-add');

// Modal content elements
const titleInput = document.querySelector('input[name="title"]');
const authorInput = document.querySelector('input[name="author"]');
const pagesInput = document.querySelector('input[name="pages"]');
const readCheck = document.querySelector('input[name="read"]');
const addBtn = document.querySelector('.add-button');

//Error message elements
const titleError = document.querySelector('input[name="title"]+p');
const authorError = document.querySelector('input[name="author"]+p');
const pagesError = document.querySelector('input[name="pages"]+p');

modalBtn.addEventListener('click', showModal);
window.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModal);
addBtn.addEventListener('click', processAdd);

//constructor to use when adding books to the library
function Book(title, author, pages, complete) {
  this.title = title;
  this. author = author;
  this. pages = pages;
  this.complete = complete;

  this.info = function(){
    let statusText = "not read yet";
    if (this.complete === true) {
      statusText = 'read';
    }
    return `${this.title} by ${author}, ${this.pages} pages, ${statusText}`;
  }
}

function showModal() {
  modal.classList.add('modal-active');
}

//close the modal when clicking outside the modal or hitting the Esc key
function closeModal(e) {
  if (e.target === modal){
    modal.classList.remove('modal-active');
    clearErrorMessage();
  }
  if (e.key === 'Escape'){
    modal.classList.remove('modal-active');
    clearErrorMessage();
  }
}

function processAdd() {
  console.log(validateForm());
  if(validateForm()) {
    const newBook = new Book(titleInput.value, authorInput.value, 
      pagesInput.value, readCheck.checked)
    clearInputs();
    createCard(newBook);
  }
}

function validateForm() {
  let passValidation = true;
  if (!titleInput.value) {
    titleError.classList.add('invalid-message-active');
    passValidation = false;
  }
  if (!authorInput.value) {
    authorError.classList.add('invalid-message-active');
    passValidation = false;
  }
  if (isNaN(pagesInput.value) || pagesInput.value<=0 || pagesInput.value>=10000) {
    pagesError.classList.add('invalid-message-active');
    passValidation = false;
  }
  return passValidation;
}

function clearErrorMessage() {
  titleError.classList.remove('invalid-message-active');
  authorError.classList.remove('invalid-message-active');
  pagesError.classList.remove('invalid-message-active');
}

function clearInputs() {
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readCheck.checked = false;
}

function createCard(book) {
  const card = document.createElement('div');
  const removeBtn = document.createElement('button');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readStatus = document.createElement('button');

  removeBtn.textContent = '???'
  title.textContent = `${book.title}`;
  author.textContent = `${book.author}`;
  pages.textContent = `${book.pages} Pages`;

  if(book.complete) {
    readStatus.textContent = 'Read';
    readStatus.classList.add('readStatus-yes');
  } else {
    readStatus.textContent = 'Not Read';
    readStatus.classList.add('readStatus-no');
  }

  card.classList.add('card');
  removeBtn.classList.add('remove-btn');

  removeBtn.addEventListener('click',deleteCard);
  readStatus.addEventListener('click', toggleReadStatus);

  card.appendChild(removeBtn);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(readStatus);
  main.appendChild(card);
}

function deleteCard(e) {
  const selectedCard = e.target.parentNode;
  selectedCard.parentNode.removeChild(selectedCard);
}

function toggleReadStatus(e) {
  e.target.classList.toggle('readStatus-yes');
  e.target.classList.toggle('readStatus-no');
  if(e.target.classList.contains('readStatus-yes')) {
    e.target.textContent = 'Read';
  } else {
    e.target.textContent = "Not Read";
  }
}

//Create initial sample book
const gatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 208, true);
createCard(gatsby);