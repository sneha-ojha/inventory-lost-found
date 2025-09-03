const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");

// READ all claims
router.get("/", claimController.getAllClaims);

// CREATE form
router.get("/new", claimController.getNewClaimForm);

// CREATE claim
router.post("/", claimController.createClaim);

// UPDATE claim status
router.post("/:id/status", claimController.updateClaimStatus); // Or PUT with method-override

module.exports = router;
