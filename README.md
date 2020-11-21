## Express Microservice

### https://apiquotesapi.herokuapp.com/api/quotes

### About

:floppy_disk: This is a simple express microservice. Client can get all quotes, one quote by id, delete and update quote by id. Also clinet can post a new quote and if required fields are not provided - random quote is fetched from a downstream API

## Learning goals:
- Implement an HTTP API web server microservice.
- Interact with downstream APIs.
- Connect server to NoSQL database .
- Test API endpoints and mock downstreams API requests.

## Technologies Used:
- Node | Express
- MongoDB | Mongoose | MongoDB Atlas | MongoDB Compass
- Jest | Supertest | Nock
- Node Fetch

## File structure
- [Server](https://github.com/edignot/node-express-mongoDB-mongoose-jest-supertest-nock/blob/master/server.js)
- [App](https://github.com/edignot/node-express-mongoDB-mongoose-jest-supertest-nock/blob/master/app.js)
- [Routes](https://github.com/edignot/node-express-mongoDB-mongoose-jest-supertest-nock/blob/master/api/routes/quotesRouter.js)
- [Model](https://github.com/edignot/node-express-mongoDB-mongoose-jest-supertest-nock/blob/master/api/models/quoteSchema.js)
- [Controller](https://github.com/edignot/node-express-mongoDB-mongoose-jest-supertest-nock/blob/master/api/controllers/quotesController.js)
- [Endpoint testing](https://github.com/edignot/node-express-mongoDB-mongoose-jest-supertest-nock/blob/master/api/tests/quotes.test.js)

## REST API Endpoints:
Local Server

`'http://localhost:3000/api/quotes'`

- `GET`
- `POST`

`'http://localhost:3000/api/quotes/:id'`

- `GET`
- `PATCH`
- `DELETE`

Production

`https://apiquotesapi.herokuapp.com/api/quotes`

- `GET`
- `POST`

`https://apiquotesapi.herokuapp.com/api/quotes/:id`

- `GET`
- `PATCH`
- `DELETE`

## Sample response 
- GET `http://localhost:3000/api/quotes`
```
[
    {
        "_id": "5fa1cab353459e9f3d03361b",
        "quote": "If you don't go after what you want, you'll never have it. If you don't ask, the answer is always no. If you don't step forward, you're always in the same place.",
        "author": "Nora Roberts",
        "createdAt": "2020-11-03T21:25:07.226Z",
        "updatedAt": "2020-11-03T21:25:07.226Z",
        "__v": 0
    },
    {
        "_id": "5fa1cab553459e9f3d03361c",
        "quote": "A goal is a dream with a deadline.",
        "author": "Napoleon Hill",
        "createdAt": "2020-11-03T21:25:09.678Z",
        "updatedAt": "2020-11-03T21:25:09.678Z",
        "__v": 0
    }
]
```

## Testing
- Utilized hooks to connect to local MongoDB before all tests run and disconnect after all tests finish running. Also seed testing database with testing data before each test and delete data after each test. 

```
beforeAll(async () => {
beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1/testing', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
```
- Utilized Nock npm package and mocked downstream API response 
```
  test('POST | save quote to database with external api data', async (done) => {
    const mockedResponse = [{ text: 'mock quote', author: 'mock author' }]
    nock('https://type.fit').get('/api/quotes').reply(200, mockedResponse)
    ...
  })
```


- [All tests](https://github.com/edignot/node-express-mongoDB-mongoose-jest-supertest-nock/blob/master/api/tests/quotes.test.js) are successfully passing

```
 PASS  api/tests/quotes.test.js
  Quote API endpoints
    ✓ GET | get all quotes from database (42 ms)
    ✓ POST | save quote to database with user data (28 ms)
    ✓ POST | save quote to database with external api data (20 ms)
    ✓ GET | get quote from database by id (11 ms)
    ✓ GET | returns message if quote id doesn't exist (10 ms)
    ✓ PATCH | update quote by id (44 ms)
    ✓ PATCH | returns message if quote id doesn't exist (12 ms)
    ✓ DELETE | delete quote by id (11 ms)
    ✓ DELETE | returns message if quote id doesn't exist (7 ms)
    ✓ GET | Default response if endpoint doesn't exist (7 ms)
    ✓ POST | Default response if endpoint doesn't exist (7 ms)
    ✓ PATCH | Default response if endpoint doesn't exist (10 ms)
    ✓ DELETE | Default response if endpoint doesn't exist (7 ms)

Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        3.807 s
```
