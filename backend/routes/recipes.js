const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipesController');

router.get('/', controller.getPaginatedRecipes);
router.get('/search', controller.searchRecipes);

module.exports = router;
