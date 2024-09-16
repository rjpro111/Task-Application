const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const userController = require('../controllers/userController');

// admin 

// router.get('/', auth, role(['admin']), userController.getAllUsers);
router.put('/:id/role', auth, role(['admin']), userController.updateUserRole);

router.get('/', auth, role(['admin']), userController.getAllUsers);

// Admin and User both
router.put('/:id', auth, userController.updateUserDetails);


module.exports = router;
