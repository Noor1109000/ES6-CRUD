//Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//UI constructor
function UI(){}


// Add BookList using prototype
UI.prototype.addBookList = function(book){
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

// Delete BookList using prototype
UI.prototype.deleteBookList = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}


// Validation Alert
UI.prototype.showAlert = function(message, className){
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

//Clear data from the input fields
UI.prototype.clearFields = function(){
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("isbn").value = '';
}




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

        ui.addBookList(book)

        //Success button
        ui.showAlert("Book Added On the list !", 'success')
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
    
    //Show message
    ui.showAlert('Book Removed', 'remove')

    e.preventDefault();
});