const express = require('express');
const router = express.Router();
const { adminLogin, customerLogin,  logout } = require('../controllers/authController');
const {getAllBooks,searchBooks,updateBook,deleteBook,addBook} = require("../controllers/bookController");
const {getAllOrders,addOrder}= require("../controllers/orderController");
const {getAllCustomers,updateCustomer,deleteCustomer,addCustomer}= require("../controllers/customerController");
// Login Route
router.post('/adminLogin', adminLogin);
router.post('/customerLogin', customerLogin);

// Logout Route
router.get('/logout', logout);

router.get('/getAllBooks',getAllBooks)
router.get('/search', searchBooks);

router.post('/updateBook',updateBook)
router.post('/deleteBook',deleteBook)
router.post('/addBook',addBook)
router.get('/getAllOrders',getAllOrders)
router.post('/addOrder',addOrder)

// User Routes
router.get('/getAllCustomers',getAllCustomers)
router.post('/updateCustomer',updateCustomer)
router.post('/deleteCustomer',deleteCustomer)
router.post('/addCustomer',addCustomer)

module.exports = router;
