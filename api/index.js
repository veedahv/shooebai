const express = require('express')

// Create express instance
const cors = require('cors')
const app = express()

app.use(cors())

// Require API routes
const currency = require('./routes/currency')
const country = require('./routes/country')
const location = require('./routes/location')
const test = require('./routes/test')

// Import API Routes
app.use(currency)
app.use(country)
app.use(location)
app.use(test)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}

