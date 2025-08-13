const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const ClientSideError = require("../errors/ClientSideError");

// View all items
exports.getAllItems = asyncHandler(async (req, res) => {
  const items = await db.getAllItems();
  res.render("items/index", { items });
});

// Show the report item form
exports.getNewItemForm = (req, res) => {
  res.render("items/new");
};

// Create a new item
exports.createItem = asyncHandler(async (req, res) => {
  const { title, description, location, status, category } = req.body;

  if (!title || !location || !status || !category) {
    throw new ClientSideError("All required fields must be provided");
  }

  await db.insertItem({ title, description, location, status, category });
  res.redirect("/items");
});


// Show edit form
exports.getEditItemForm = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await db.getItemById(id);

  if (!item) throw new ClientSideError("Item not found");

  res.render("items/edit", { item });
});

// Update item
exports.updateItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, description, location, status } = req.body;

  if (!title || !location || !status) {
    throw new ClientSideError("All fields are required");
  }

  await db.updateItem(id, { title, description, location, status });

  // If item is now marked "found", redirect to add claimant
  if (status.toLowerCase() === "found") {
    return res.redirect(`/claimants/new?item_id=${id}`);
  }

  res.redirect("/items");
});


// Delete item
exports.deleteItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await db.deleteItem(id);
  res.redirect("/items");
});

//search by item
exports.searchItems = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const items = await db.searchItemsByTitle(query);
  res.render('items/index', { items });
});

//show item details
exports.getItemDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await db.getItemById(id);
  if (!item) {
    throw new ClientSideError("Item not found");
  }

  res.render("items/show", { item });
});
