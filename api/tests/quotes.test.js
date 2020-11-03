const mongoose = require('mongoose')
const nock = require('nock')
const supertest = require('supertest')
const app = require('../../app')
const request = supertest(app)
const Quote = require('../models/quoteSchema.js')
const testQuotes = require('./quotes.test.data')

describe('Quote API endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1/testing', {
      useNewUrlParser: true,
    })
  })

  beforeEach(async () => {
    for (const testQuote of testQuotes) {
      const newQuote = new Quote({
        quote: testQuote.quote,
        author: testQuote.author,
      })
      await newQuote.save()
    }
  })

  afterEach(async () => {
    await Quote.deleteMany()
  })

  afterAll(async () => {
    await Quote.drop()
    await mongoose.connection.close()
  })

  test('GET | get all quotes from database', async (done) => {
    const res = await request.get('/api/quotes')

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(testQuotes.length)
    expect(res.body[0].quote).toBe(testQuotes[0].quote)
    expect(res.body[0].author).toBe(testQuotes[0].author)

    done()
  })

  test('POST | save quote to database with user data', async (done) => {
    const res = await request
      .post('/api/quotes')
      .send({ quote: 'QUOTE', author: 'AUTHOR' })

    expect(res.status).toBe(200)
    expect(res.body.quote).toBe('QUOTE')
    expect(res.body.author).toBe('AUTHOR')

    const savedQuote = await Quote.findById(res.body._id)
    expect(savedQuote.quote).toBe(res.body.quote)
    expect(savedQuote.author).toBe(res.body.author)

    done()
  })

  test('POST | save quote to database with external api data', async (done) => {
    const mockedResponse = [{ text: 'mock quote', author: 'mock author' }]
    nock('https://type.fit').get('/api/quotes').reply(200, mockedResponse)

    const res = await request.post('/api/quotes').send()

    expect(res.status).toBe(200)
    expect(res.body.quote).toBe('mock quote')
    expect(res.body.author).toBe('mock author')

    const savedQuote = await Quote.findById(res.body._id)
    expect(savedQuote.quote).toBe(res.body.quote)
    expect(savedQuote.author).toBe(res.body.author)

    done()
  })
})
