const Book = require('../models/Book');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// Add a new book
const addBook = async (req, res) => {
  const newBook = new Book(req.body);
  try {
    // Validate input data before saving
    if (!newBook.title || !newBook.author || !newBook.price) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
    await newBook.save();
    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a book by ID
const updateBook = async (req, res) => {
    try {
      
      const updatedBook = await Book.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
  
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Inventory management (updating book quantities, managing stock)
const updateBookInventory = async (req, res) => {
  try {
    const { quantity } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.inStock += quantity; // Adjust inventory based on input
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.body._id);
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new stock to inventory
const addStock = async (req, res) => {
    try {
      const { quantity } = req.body;
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      book.inStock += quantity; // Add new stock to inventory
      await book.save();
  
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Place an order (reduce in-stock, increase on-order)
  const placeOrder = async (req, res) => {
    try {
      const { quantity } = req.body;
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      if (book.inStock < quantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
      }
  
      book.inStock -= quantity; // Reduce in-stock
      book.onOrder += quantity; // Increase on-order
      await book.save();
  
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Search books
const searchBooks = async (req, res) => {
  try {
    // Extract the search query from request parameters
    const query = req.query;
console.log(query);
    // Perform a search using MongoDB's find method
    var books=[]
    console.log(query.title);
    if(query.title && query.author){

      books=await Book.find({
     
      
         title: new RegExp(req.query.title,'i'),
         author: new RegExp(req.query.author,'i')
         // Case-insensitive search for title
         // { author: { $regex: query.author, $options: 'i' } }, // Case-insensitive search for author
         // Add other search criteria as needed
     
     });
    res.status(200).json(books);

    }
    else if(query.title){

      books=await Book.find({
     
      
         title: new RegExp(req.query.title,'i'),
     
         // Case-insensitive search for title
         // { author: { $regex: query.author, $options: 'i' } }, // Case-insensitive search for author
         // Add other search criteria as needed
     
     });
    res.status(200).json(books);

    }
   else if(query.author){

      books=await Book.find({
     
      
         author: new RegExp(req.query.author,'i') ,
     
         // Case-insensitive search for title
         // { author: { $regex: query.author, $options: 'i' } }, // Case-insensitive search for author
         // Add other search criteria as needed
     
     });
    res.status(200).json(books);

    }else{
      // return all books if no params is given
      getAllBooks(req,res)

    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  

module.exports = { getAllBooks, addBook, getBookById, updateBook, deleteBook, updateBookInventory, addStock, placeOrder, searchBooks, };
