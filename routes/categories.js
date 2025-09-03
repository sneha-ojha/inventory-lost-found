const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// READ all categories
router.get("/", categoryController.getAllCategories);

// CREATE form
router.get("/new", categoryController.getNewCategoryForm);

// CREATE category
router.post("/", categoryController.createCategory);

// EDIT form
router.get("/:id/edit", categoryController.getEditCategoryForm);

// UPDATE category
router.post("/:id", categoryController.updateCategory); // Or use PUT if using method-override

module.exports = router;
