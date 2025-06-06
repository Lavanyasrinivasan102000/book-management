const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: String,
  quantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Number,
    default: 0,
  },
  onOrder: {
    type: Number,
    default: 0,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
