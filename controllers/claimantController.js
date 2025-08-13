const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const ClientSideError = require("../errors/ClientSideError");

// GET all claimants
exports.getAllClaimants = asyncHandler(async (req, res) => {
  const claimants = await db.getAllClaimants();
  res.render("claimants/index", { claimants });
});

// GET - Render the new claimant form
exports.getNewClaimantForm = asyncHandler(async (req, res) => {
  const itemId = req.query.item_id; // get from URL
  res.render("claimants/new", { itemId });
});

// POST - Create a new claimant
exports.createClaimant = asyncHandler(async (req, res) => {
  const { rollno, name, email, item_id } = req.body;

  if (!rollno || !name || !email || !item_id) {
    throw new ClientSideError("All fields are required");
  }

  await db.insertClaimant({ rollno, name, email, item_id });

  res.redirect("/claimants"); // Or redirect back to the item?
});

// DELETE - Remove a claimant
exports.deleteClaimant = asyncHandler(async (req, res) => {
  const { rollno } = req.params;

  const claimant = await db.getClaimantByRoll(rollno);
  if (!claimant) {
    return res.redirect("/claimants"); // Silent fail
  }

  await db.deleteClaimant(rollno);
  res.redirect("/claimants");
});

//search claimants names
exports.searchClaimants = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const claimants = await db.searchClaimantsByName(query);
  res.render('claimants/index', { claimants });
});

