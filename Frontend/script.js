const API_URL = "http://localhost:3000/books";

function fetchBooks() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById("bookList");
      list.innerHTML = "";

      data.forEach(book => {
        const li = document.createElement("li");
        li.innerHTML = `
          ${book.title} by ${book.author} - ₹${book.price}
          <button onclick="deleteBook(${book.id})">Delete</button>
        `;
        list.appendChild(li);
      });
    });
}


function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const price = document.getElementById("price").value;

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      author,
      price
    })
  })
  .then(() => {
    fetchBooks();
  });
}


function deleteBook(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    fetchBooks();
  });
}


fetchBooks();
