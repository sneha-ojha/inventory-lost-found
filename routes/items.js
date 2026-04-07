const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// 1. Static/Specific Routes (Highest Priority)
router.get('/', itemController.getAllItems);
router.get('/new', itemController.getNewItemForm);
router.get('/search', itemController.searchItems); // Move this up!
router.get('/lost', itemController.getLostItems);   // Move this up!

// 2. POST Routes
router.post('/', itemController.createItem);

// 3. Dynamic Parameter Routes (Lowest Priority)
router.get('/:id', itemController.getItemDetails); 
router.get('/:id/edit', itemController.getEditItemForm);
router.post('/:id/edit', itemController.updateItem);
router.post('/:id/delete', itemController.deleteItem);

module.exports = router;