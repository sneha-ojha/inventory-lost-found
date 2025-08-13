const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItems);
router.get('/new', itemController.getNewItemForm);
router.post('/', itemController.createItem);
router.get('/:id/edit', itemController.getEditItemForm);
router.post('/:id/edit', itemController.updateItem);
router.post('/:id/delete', itemController.deleteItem);

// optional: search
router.get('/search', itemController.searchItems);
router.get('/:id', itemController.getItemDetails);
module.exports = router;
