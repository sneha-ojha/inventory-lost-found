const express = require('express');
const router = express.Router();
const claimantController = require('../controllers/claimantController');

router.get('/', claimantController.getAllClaimants);
router.get('/new', claimantController.getNewClaimantForm);
router.post('/', claimantController.createClaimant);
router.post('/:rollno/delete', claimantController.deleteClaimant);

// optional: search
router.get('/search', claimantController.searchClaimants);

module.exports = router;
