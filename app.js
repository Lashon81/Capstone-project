console.log("Hello from app.js");

// // Define userPrompt as a function or assign a value as needed
// var userPrompt = ();

// document.getElementById("userPrompt")?.addEventListener("click", () => {
//   console.log("userPrompt");
//   fetchuserPrompt();
// });


// // Use helpers.js: Access elements by ID using helpers
// let userInput = getValue("user-chat-input");  // Get input value
// setText("chat-response", "Hello!");           // Set text content
// onEvent("send-btn", "click", function() {     // Add click event
//     console.log("Button clicked!");
// });


// Alternative: use standard, direct DOM methods Book:1
//let inputElement = document.getElementById("userPrompt");
//let buttonElement = document.getElementById("searchBtn");
//let responseElement = document.getElementById("api-response");


// Button click with validation for userInput
//onEvent("searchBtn", "click", function () {
    //let userInput = inputElement.value;

    //if (userInput === "") {//check if empty
        //setText("book-title", "Please enter a message");
        //setText("book-author_name", "Please enter a message");

    //} else {
        //setText("book-title", "Processing...");
        //setText("book-author_name", "Processing...");
        
        //fetchBooks();
    //}
//});


//const requestOptions = {
    //method: "GET",
    //redirect: "follow"
//};

// API response using .then
//function fetchBooks() {
    //let userInput = inputElement.value;
    //fetch(`https://openlibrary.org/search.json?q=${userInput}`, requestOptions)
        //.then((response) => response.json())
        //.then((result) => {
            //console.log(result);
            //setText("book-author_name", result.docs[0].author_name[0]);
            //setText("book-title", result.docs[0].title);
            
        //})
        //.catch((error) => console.error(error));

//}

const userPrompt = getValue("userPrompt"); // user input
const url = `https://www.googleapis.com/books/v1/volume?q=${userPrompt}+subject:children`;
fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data.items); // array of book results
    data.items.forEach(book => {
      console.log(book.volumeInfo.title);
      console.log(book.volumeInfo.authors);
      console.log(book.volumeInfo.description);
      console.log(book.volumeInfo.imageLinks?.thumbnail);
    });
  })
  .catch(err => console.error(err));