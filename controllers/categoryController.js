const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const ClientSideError = require("../errors/ClientSideError");

exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories/index", { categories });
});

exports.getNewCategoryForm = (req, res) => {
  res.render("categories/new");
};

exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) throw new ClientSideError("Category name is required");
  await db.insertCategory(name);
  res.redirect("/categories");
});

exports.getEditCategoryForm = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await db.getCategoryById(id);
  if (!category) throw new ClientSideError("Category not found");
  res.render("categories/edit", { category });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name) throw new ClientSideError("Name is required");
  await db.updateCategory(id, name);
  res.redirect("/categories");
});
