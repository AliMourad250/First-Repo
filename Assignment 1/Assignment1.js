class Book {
    constructor(title, author, pages, img) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.img = img;
    };

    read() {
        return "You've started reading " + Book.title + " by " + Book.author + ". It has " + Book.pages + " pages.";
    };
};


class Library {
    constructor() {
        this.books = [];
    };

    addBook(book) {
        for (let i = 0; i < this.books.length; i++) {
            if (book.title == (this.books)[i].title) {
                return "Book Already Exists!"
            }
        }
        this.books.push(book);
        return "Added!";
    }

    findBook(bookTitle) {
        for (let i = 0; i < this.books.length; i++) {
            if ((this.books)[i].title == bookTitle) {
                return bookTitle + " is Found!";
            }
        };
        return "Book not found."
    };

    generateBookHTML(book) {
        return `
            <li id="list">
                <img src="${book.img}" alt="${book.title}" id="bookImg">
                <div class="book-details">
                    <h3>${book.title}</h3>
                    <p>By ${book.author}</p>
                    <p>${book.pages} pages</p>
                </div>
            </li>
        `;
    }

    displayBooks() {
        var text = `<ul>`;
        for (let i = 0; i < this.books.length; i++) {
            // text += "<li>" + (this.books)[i].title + "</li>&nbsp; &nbsp; &nbsp; &nbsp;<img src=\"" + this.books.img + "\" alt =\"" + this.books.title + "\" id=\"bookImg\">";
            // text += "<li>" + (this.books)[i].title + `&nbsp; &nbsp; &nbsp; &nbsp;<img src="${this.books.img}" alt ="${this.books.title}" id="bookImg"></li>`;
            text += this.generateBookHTML((this.books)[i]);
        }
        text += `</ul>`;
        return text;
    }
};


b1 = new Book(
    "TITLE 1",
    "Ali",
    190,
    "bR.jpg"
);

b2 = new Book(
    "TITLE 2",
    "Joe",
    433,
    "bG.jpg"
);

b3 = new Book(
    "TITLE 3",
    "Hady",
    90,
    "bB.jpg"
);
const l1 = new Library();


l1.addBook(b1);
l1.addBook(b2);
l1.addBook(b3);
console.log(l1.findBook("TITLE 2"));
console.log(l1.findBook("TITLE 6"));

const form = document.getElementById('f');

var searchResults = document.getElementById('search-results');

const form2 = document.getElementById('moreInfo');

document.getElementById('add').onclick = function () {
    searchResults.textContent = "Please fill the information below:";
    document.getElementById('moreInfo').style.display = "block";
    document.getElementById('choice').style.display = "none";
    document.getElementById('submit').style.display = "none";
    document.getElementById('add').style.display = "none";
}

form.addEventListener("submit",
    function (event) {
        event.preventDefault();

        const titleInput = document.getElementById('Title').value;
        searchResults.textContent = l1.findBook(titleInput);

        if (searchResults.textContent == "Book not found.") {
            searchResults.textContent += " Do you wish to add this book to the library?";
            document.getElementById('choice').style.display = "flex";

        }
    }
);

document.getElementById('no').onclick = function () {
    document.getElementById('choice').style.display = "none";
    searchResults.textContent = "Thank you! Please visit us again!"
}

document.getElementById('yes').onclick = function () {
    document.getElementById('choice').style.display = "none";
    document.getElementById('moreInfo').style.display = "block";

}

form2.addEventListener("submit",
    function (event) {
        event.preventDefault();

        var titleInput = document.getElementById('Title').value;
        var authorName = document.getElementById('author').value;
        var nbp = document.getElementById('nbOfPages').value;
        var imgUrl = document.getElementById('imgURL').value;

        b = new Book(titleInput, authorName, nbp, imgUrl);

        document.getElementById('added').innerHTML = l1.addBook(b) + "<br><br>Updated list of books: <br>" + l1.displayBooks();
    }
);

document.getElementById('book-list').onclick = function () {
    document.getElementById('added').innerHTML = "<h2>List of books: </h2><br>" + l1.displayBooks();
}