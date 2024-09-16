const User = require('../models/user');



// update user role (admin only)
exports.updateUserRole = async (req, res) => {
    const { role } = req.body;
  
    // Validate input
    if (!role) {
      return res.status(400).json({ msg: 'Role is required' });
    }
  
    try {
      // Update user role using findByIdAndUpdate
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.json({ msg: 'User role updated', user: updatedUser });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  // Update User Details (Admin and User themselves)
exports.updateUserDetails = async (req, res) => {
    const { name, email, password } = req.body;
  
    // Validate input
    if (!name || !email) {
      return res.status(400).json({ msg: 'Name and email are required' });
    }
  
    try {
      // Check if the user is trying to update their own details or if they are an admin
      if (req.user.id !== req.params.id && req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
      }
  
      // Update user details using findByIdAndUpdate
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.json({ msg: 'User details updated', user: updatedUser });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  // Get All Users (Admin only)
exports.getAllUsers = async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Only admins can access this route' });
    }
  
    try {
      const users = await User.find({});
  
      if (!users) {
        return res.status(404).json({ msg: 'No users found' });
      }
  
      res.json({ msg: 'Users retrieved successfully', users });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };