const express = require("express");
const cors = require("cors");


const app = express();
const PORT = 5000;



app.use(cors());
app.use(express.json());

let books = [];
let bookId = 1;


app.get("/", (req, res) => {
  res.send("Book Store API is running");
});


app.post("/books", (req, res) => {
  const { title, author, price } = req.body;

  const newBook = {
    id: bookId++,
    title,
    author,
    price
  };

  books.push(newBook);

  res.status(201).json(newBook);
});


app.get("/books", (req, res) => {
  res.json(books);
})

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});


app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, price } = req.body;

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = title || book.title;
  book.author = author || book.author;
  book.price = price || book.price;

  res.json(book);
});


app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(index, 1);

  res.json({ message: "Book deleted successfully" });
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
