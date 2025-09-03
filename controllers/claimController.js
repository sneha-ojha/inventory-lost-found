const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const ClientSideError = require("../errors/ClientSideError");

exports.getAllClaims = asyncHandler(async (req, res) => {
  const claims = await db.getAllClaims();
  res.render("claims/index", { claims });
});

exports.getNewClaimForm = asyncHandler(async (req, res) => {
  const items = await db.getAllItems();
  res.render("claims/new", { items });
});

exports.createClaim = asyncHandler(async (req, res) => {
  const { item_id, claimant_roll, notes } = req.body;
  if (!item_id || !claimant_roll) {
    throw new ClientSideError("Item and claimant are required");
  }
  await db.insertClaim({ item_id, claimant_roll, notes });
  await db.markItemClaimed(item_id);
  res.redirect("/claims");
});

exports.updateClaimStatus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  if (!["pending", "approved", "rejected"].includes(status)) {
    throw new ClientSideError("Invalid claim status");
  }
  await db.updateClaimStatus(id, status);
  res.redirect("/claims");
});
