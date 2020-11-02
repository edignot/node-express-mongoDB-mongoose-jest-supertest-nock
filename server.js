require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true })

mongoose.connection.on('error', () => {
  console.log('Error connecting database')
})

mongoose.connection.once('open', () => {
  console.log('Database successfully connected')
})

const app = require('./app')

const port = process.env.PORT || 5000

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`),
)
