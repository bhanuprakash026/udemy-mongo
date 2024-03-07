const express = require('express')
const morgan = require('morgan')
const app = express()
const tourRouter = require('./routes/tourRouter')
const userRouter = require('./routes/userRouter')


// MIDDLEWARES
app.use(express.json())

if(process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}

app.use(express.static(`${__dirname}/starter/public`));

app.use((req, res, next) => {
  console.log('Hello From middleware');
  next();
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})


// API HANDLERS
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app