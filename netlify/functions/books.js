const mongoose = require("mongoose");

let conn = null;

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  publishedYear: Number,
  availableCopies: Number,
});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

// MongoDB connection (cached)
async function connectDB() {
  if (conn) return conn;

  conn = await mongoose.connect(process.env.MONGO_URI);
  return conn;
}

exports.handler = async (event) => {
  await connectDB();

  // GET → fetch all books
  if (event.httpMethod === "GET") {
    const books = await Book.find();
    return {
      statusCode: 200,
      body: JSON.stringify(books),
    };
  }

  // POST → add new book
  if (event.httpMethod === "POST") {
    const data = JSON.parse(event.body);
    const newBook = new Book(data);
    await newBook.save();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Book added successfully" }),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
  };
};
