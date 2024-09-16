// controllers/taskController.js
const Task = require('../models/task');

exports.createTask = async (req, res) => {
  const { description, category } = req.body;
  
  try {
    const newTask = await Task.create({ description, category, userId: req.user.id });
    
    res.json({ msg: 'Task created successfully', task: newTask });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: 'Invalid request', errors: err.errors });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    
    if (!tasks) {
      return res.status(404).json({ msg: 'No tasks found' });
    }
    
    res.json({ msg: 'Tasks retrieved successfully', tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getUserTasksByCategory = async (req, res) => {
  const { category } = req.params;
  
  try {
    const tasks = await Task.find({ userId: req.user.id, category });
    
    if (!tasks) {
      return res.status(404).json({ msg: 'No tasks found' });
    }
    
    res.json({ msg: 'Tasks retrieved successfully', tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.markTaskAsCompleted = async (req, res) => {
  const { id } = req.params;
  
  try {
    const task = await Task.findByIdAndUpdate(id, { completed: true }, { new: true });
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    res.json({ msg: 'Task marked as completed', task });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    console.log(id);
  
    try {
      const result = await Task.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ msg: 'Task not found' });
      }
      res.json({ msg: 'Task deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

// Admin only functions
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    
    if (!tasks) {
      return res.status(404).json({ msg: 'No tasks found' });
    }
    
    res.json({ msg: 'Tasks retrieved successfully', tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllTasksByCategory = async (req, res) => {
  const { category } = req.params;
  
  try {
    const tasks = await Task.find({ category });
    
    if (!tasks) {
      return res.status(404).json({ msg: 'No tasks found' });
    }
    
    res.json({ msg: 'Tasks retrieved successfully', tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createTaskForUser = async (req, res) => {
  const { userId, description, category } = req.body;
  
  // Validate input
  if (!userId || !description || !category) {
    return res.status(400).json({ msg: 'User ID, description, and category are required' });
  }
  
  try {
    const task = new Task({ description, category, userId });
    await task.save();
    
    res.json({ msg: 'Task created successfully', task });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: 'Invalid request', errors: err.errors });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateTaskForUser = async (req, res) => {
  const { id } = req.params;
  const { description, category } = req.body;
  
  try {
    const task = await Task.findByIdAndUpdate(id, { description, category }, { new: true });
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    res.json({ msg: 'Task updated successfully', task });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: 'Invalid request', errors: err.errors });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteTaskForUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    await Task.findByIdAndRemove(id);
    
    res.json({ msg: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};