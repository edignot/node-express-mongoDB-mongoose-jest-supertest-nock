const mongoose = require('mongoose')

const quotesSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const Quote = mongoose.model('Quote', quotesSchema)

module.exports = Quote
