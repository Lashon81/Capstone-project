console.log("Hello from app.js");

// HTML: userprompt line 26, serachBtn line 30, api-response line 32 & 36
let inputElement = document.getElementById("userPrompt");
let buttonElement = document.getElementById("searchBtn");
let responseElement = document.getElementById("api-response");

// Button click with validation for userInput
onEvent("searchBtn", "click", function () {
    let userInput = inputElement.value;

    if (userInput === "") {
        setText("book-title", "Please enter a message");
        setText("book-author_name", "Please enter a message");

    } else {
        setText("book-title", "Processing...");
        setText("book-author_name", "Processing...");
        fetchBooks();
    }
});




const requestOptions = {
    method: "GET",
    redirect: "follow"
};

// API response using .then
function fetchBooks() {
    let userInput = inputElement.value;
    fetch(`https://openlibrary.org/search.json?q=${userInput}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            setText("book-author_name", result.docs[0].author_name[0]);
            setText("book-title", result.docs[0].title);
            fetchSummary(result.docs[0].title)
                .then((result) => {
                    setText("summary", result.choices[0].message.content)
                    console.log(result.choices[0].message.content);
                })
        })
        .catch((error) => console.error(error));

}

// code fetched from hugging face
async function fetchSummary(bookTitle) {
    let body = {
        messages: [
            {
                role: "user",
                content: "Write me a short 100 word summary of " + bookTitle,
            },
        ],
        model: "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai",
    }
    console.log(HF_TOKEN)
    const response = await fetch(
        "https://router.huggingface.co/v1/chat/completions",
        {
            headers: {
                Authorization: `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(body),
        }
    );
    const result = await response.json();
    return result;
}