class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

class UI{

    addBookList(book){
        const list = document.getElementById("book-list");

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
    
        list.appendChild(row);

    }



    deleteBookList(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }

    }



    showAlert(message, className){
        //Create div
        const div = document.createElement("div");

        //Add Classes
        div.className = `alert ${className}`;

        //Add text
        div.appendChild(document.createTextNode(message));

        //Get parent
        const container = document.querySelector(".container");

        //Get form
        const form = document.querySelector("#book-form");

        //Insert alert
        container.insertBefore(div, form);

        //Timeout after 3sec
        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000);

    }

    clearFields(){
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("isbn").value = '';

    }

}

//Add Local Storage
class Store{
   static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

  static displayBooks(){
      const books = Store.getBooks();

      books.forEach(function(book){
          const ui = new UI;

          //Add book to UI
          ui.addBookList(book);
      });

    }

   static addBook(book){
        const books = Store.getBooks();


        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))

    }

   static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}



//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);



// EventListener for Add book
document.getElementById("book-form").addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
          author=  document.getElementById('author').value,
          isbn  = document.getElementById('isbn').value;

    // Initiate book instance
    const book = new Book(title, author, isbn)


      //Initiate book UI 
      const ui = new UI();

    //Validation alert
    if((title === '')||(author === '') || (isbn === '')){
        ui.showAlert('Please fill in all fields', 'error');
        
    }else{

        ui.addBookList(book);

        //LS add book
        Store.addBook(book);

        
        //Success button
        ui.showAlert("Book Added On the list !", 'success');
        //Ul clear
        ui.clearFields();
    }

    e.preventDefault();
})


// EventListener for delete book
document.getElementById("book-list").addEventListener('click', function(e){
    
    // Instantiate UI
    const ui = new UI();

    // Delete Book
    ui.deleteBookList(e.target);

    //LS remove book
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
   
    
    //Show message
    ui.showAlert('Book Removed', 'remove')

    e.preventDefault();
});