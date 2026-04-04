const express = require("express");
const router = express.Router();
const categoryCont = require("../controllers/categoryController");

// READ all categories
router.get("/", categoryCont.getAllCategories);

// CREATE form
router.get("/new", categoryCont.getNewCategoryForm);

// CREATE category
router.post("/", categoryCont.createCategory);

// EDIT form
router.get("/:id/edit", categoryCont.getEditCategoryForm);

// UPDATE category
router.post("/:id", categoryCont.updateCategory); // Or use PUT if using method-override

module.exports = router;
