// routes/task.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

// users and admins


router.post('/tasks', auth, taskController.createTask);
router.get('/tasks', auth, taskController.getUserTasks);
router.get('/tasks/:category', auth, taskController.getUserTasksByCategory);
router.patch('/tasks/:id', auth, taskController.markTaskAsCompleted);
router.delete('/tasks/:id', auth, taskController.deleteTask);

// admin only
router.get('/all/tasks', auth, role(['admin']), taskController.getAllTasks);
router.get('/all/tasks/:category', auth, role(['admin']), taskController.getAllTasksByCategory);
router.post('/all/tasks', auth, role(['admin']), taskController.createTaskForUser);
router.patch('/all/tasks/:id', auth, role(['admin']), taskController.updateTaskForUser);
router.delete('/all/tasks/:id', auth, role(['admin']), taskController.deleteTaskForUser);

router.get('/users', auth, role(['admin']), userController.getAllUsers);
router.patch('/users/:id', auth, role(['admin']), userController.updateUserRole);

module.exports = router;