const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const globalErrorHandler = require('./controller/errorController')
const appError = require('./utils/appError')
const email = require('./utils/email')
const childRouter = require('./router/child');
const authRouter = require('./router/user')
const avaterRouter = require('./router/avater')
const interestRouter = require('./router/interest')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public/avater')))

app.use('/api/v1/avater', avaterRouter)
app.use('/api/v1/user', authRouter)
app.use('/api/v1/child', childRouter)
app.use('/api/v1/interest', interestRouter)

app.all(`*`, (req, res, next) => {
    next(new appError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app;