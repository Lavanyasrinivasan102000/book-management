const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    
    required: true,
  },

  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  orderItems: [
    {
      book: {
        type: String,
      
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
