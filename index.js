import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes'
import mongoose from 'mongoose'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const HTML_FILE = path.join(__dirname, 'index.html')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

// Base Route
app.get('/', (req, res) => {
  res.sendFile(HTML_FILE)
})

app.use('/api/', router)

// Catch 404 Error and Forward to Handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true
})
  .then(() => console.log('database connected sucessfully'))
  .catch(err => console.log(err))

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
})
