const myLibrary = [];
const bookshelf = document.querySelector(".bookshelf");
const addBook = document.querySelector(".add-book");
const form = document.querySelector("form");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector(".close");

// book constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeStatus = function() {
    if (this.read === "yes") {
        this.read = "no";
    }
    else {
        this.read = "yes";
    }
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    bookshelf.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const currentBook = myLibrary[i];

        const book = document.createElement("div");
        book.classList.add("book");
        book.id = currentBook.id;

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = currentBook.title;
        book.appendChild(title);
        
        const author = document.createElement("div")
        author.classList.add("author");
        author.textContent = currentBook.author;
        book.appendChild(author);

        const pages = document.createElement("div");
        pages.classList.add("pages");
        pages.textContent = currentBook.pages;
        book.appendChild(pages);

        const read = document.createElement("button");
        read.classList.add("read-button");
        read.textContent = currentBook.read === "yes" ? "Read" : "Not Read";
        if (currentBook.read == "yes") {
            read.classList.add("yes");
        }
        else {
            read.classList.add("no");
        }

        read.addEventListener("click", ()=> {
            currentBook.changeStatus();
            displayBooks();
        });

        book.appendChild(read);

        const remove = document.createElement("button");
        remove.classList.add("remove-button");
        remove.id = currentBook.id;
        remove.textContent = "Remove";
        
        remove.addEventListener("click", ()=> {
            const index = myLibrary.findIndex(book => book.id === currentBook.id);
            myLibrary.splice(index, 1);
            displayBooks();
        });

        book.appendChild(remove);
        
        bookshelf.appendChild(book);
    }
}



addBook.addEventListener("click", ()=> {
    dialog.showModal();
});


closeButton.addEventListener("click", function() {
    dialog.close();
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const data = new FormData(form);

    const title = data.get("title");
    const author = data.get("author");
    const pages = data.get("pages");
    const read = data.get("read");

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    form.reset();
    dialog.close();
});