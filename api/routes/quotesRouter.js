const express = require('express')

const quotesController = require('../controllers/quotesController')

const router = express.Router()

router
  .route('/')
  .get(quotesController.get_quotes)
  .post(quotesController.post_quote)

router
  .route('/:id')
  .get(quotesController.get_quote)
  .patch(quotesController.update_quote)
  .delete(quotesController.delete_quote)

module.exports = router
