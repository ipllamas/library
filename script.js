let myLibrary = [];

const addBtn = document.querySelector('.modal-add');
addBtn.addEventListener('click', showModal);

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
  console.log('clicked');
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
}
