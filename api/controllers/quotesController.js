const Quote = require('../models/quoteSchema')

exports.get_quotes = (req, res) => {
  Quote.find()
    .then((quotes) =>
      quotes.length
        ? res.status(200).json(quotes)
        : res.status(200).json({ message: 'No quotes found' }),
    )
    .catch((error) =>
      res.status(500).json({ message: 'Something went wrong', error }),
    )
}

exports.post_quote = (req, res) => {
  const newQuote = new Quote({
    quote: req.body.quote,
    author: req.body.author,
  })

  newQuote
    .save()
    .then(() => res.status(200).json(newQuote))
    .catch((error) =>
      res.status(500).json({ message: 'Something went wrong', error }),
    )
}

exports.get_quote = async (req, res) => {
  Quote.findById(req.params.id)
    .then((quote) => res.status(200).json(quote))
    .catch((error) =>
      res.status(404).json({ message: 'Quote not found', error }),
    )
}

exports.update_quote = async (req, res) => {
  Quote.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((quote) => res.status(200).json(quote))
    .catch((error) =>
      res.status(404).json({ message: 'Quote not found', error }),
    )
}

exports.delete_quote = async (req, res) => {
  Quote.findByIdAndDelete(req.params.id).then(() =>
    res.json({ message: 'Quote deleted' }),
  )
}
