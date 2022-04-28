let myLibrary = [];

const modal = document.querySelector('.modal-inactive');
const modalBtn = document.querySelector('.modal-add');

const title = document.querySelector('input[name="title"]');
const author = document.querySelector('input[name="author"]');
const pages = document.querySelector('input[name="pages"]');
const read = document.querySelector('input[name="read"]');
const addBtn = document.querySelector('.add-button');

modalBtn.addEventListener('click', showModal);
window.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModal);
addBtn.addEventListener('click', validateForm);

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
  /* modal.classList.add('.modal-active'); */
  modal.style.display = 'block';
}

function closeModal(e) {
  console.log(e.target);
  if (e.target === modal){
    /* modal.classList.remove('.modal-active'); */
    modal.style.display = 'none';
  }
  if (e.key === 'Escape'){
    /* modal.classList.remove('.modal-active'); */
    modal.style.display = 'none';
  }
}

function validateForm() {
  let passValidation = true;
  const titleError = document.querySelector('input[name="title"]+p');
  const authorError = document.querySelector('input[name="author"]+p');
  const pagesError = document.querySelector('input[name="pages"]+p');
  if (!title.value) {
    titleError.classList.add('invalid-message-active');
  }
  if (!author.value) {
    authorError.classList.add('invalid-message-active');
  }
  if (!pages.value || pages.value===0 || pages.value>=10000) {
    pagesError.classList.add('invalid-message-active');
  }
}