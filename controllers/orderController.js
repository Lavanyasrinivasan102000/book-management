const Order = require('../models/Order');
const Book = require('../models/Book');
const Customer = require('../models/Customer');

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// Add a new order
const addOrder = async (req, res) => {
    const { customerId, orderDate, status, orderItems } = req.body;
    try {
      if (!customerId  || !orderItems) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newOrder = new Order({
        customerId,
        orderDate,
        status,
        orderItems,
      });
  
      await newOrder.save();
      res.status(200).json(newOrder);
    } catch (err) {
      res.status(400).json({ message: 'Failed to add order', error: err.message });
    }
  };

// Get an order by ID
const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch order', error: error.message });
    }
  };
  
  // Update an order by ID
  const updateOrder = async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order', error: error.message });
    }
  };
  
  // Delete an order by ID
  const deleteOrder = async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
  };
  
  // Place an order
  const placeOrder = async (req, res) => {
    const { customerId, orderItems } = req.body;
  
    try {
      const isValidOrder = await validateOrder(orderItems, customerId);
  
      if (!isValidOrder) {
        return res.status(400).json({ message: 'Invalid order or customerId' });
      }
  
      const newOrder = new Order({
        customerId,
        orderItems,
        status: 'Pending',
      });
  
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: 'Failed to place order', error: error.message });
    }
  };

 // Update order status
const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
  };

/* Checks the validity of order items by querying the Book model to verify item 
availability and quantity in the inventory. It also checks if the customer 
exists by querying the Customer model using the provided customer ID.*/

const validateOrder = async (orderItems, customerId) => {
  try {
    // Validate order items by checking inventory
    const validOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const book = await Book.findById(item.bookId);

        if (!book || book.inStock < item.quantity) {
          return false; // Item not found or insufficient stock
        }
        return true; // Item is valid
      })
    );

    if (validOrderItems.includes(false)) {
      return false; // At least one item is invalid
    }

    // Validate the customerId
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return false; // Customer not found
    }

    return true; // Order and customer are valid
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllOrders,
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  placeOrder,
  updateOrderStatus,
  validateOrder
};
