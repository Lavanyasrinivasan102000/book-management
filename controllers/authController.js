const Customer = require('../models/Customer');


// Admin Login Controller
const adminLogin = async (req, res) => {
  console.log(req.body);
  
   const username= req.body.username;
   const password= req.body.password;

  try {
    const user = await Customer.findOne({ username }); // Assuming username is unique

    if (!user ) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. User is not an admin.' });
    }
  
     // Handle successful authentication, return user or redirect
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Customer Login Controller
const customerLogin = async (req, res, next) => {
  
  const { username, password } = req.body;

  try {
    const user = await Customer.findOne({ username }); // Assuming username is unique

    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role !== 'user') {
      return res.status(403).json({ message: 'Access denied.' });
    }
  
     // Handle successful authentication, return user or redirect
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};

// Logout Controller
const logout = (req, res) => {
  req.logout();
  // Handle logout response or redirect
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { adminLogin, customerLogin, logout };
