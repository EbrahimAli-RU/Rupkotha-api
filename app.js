const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

const globalErrorHandler = require('./controller/errorController')
const appError = require('./utils/appError')
const email = require('./utils/email')
const childRouter = require('./router/child');
const authRouter = require('./router/user')
const avaterRouter = require('./router/avater')
const interestRouter = require('./router/interest')
const bookRouter = require('./router/book')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({origin: ["http://localhost:3000"], credentials: true}))

app.use(cookieParser())
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public/avater')))
app.use(express.static(path.join(__dirname, 'public/interest')))
app.use(express.static(path.join(__dirname, 'public/book')))

app.use('/api/v1/avater', avaterRouter)
app.use('/api/v1/user', authRouter)
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/child', childRouter)
app.use('/api/v1/interest', interestRouter)

app.all(`*`, (req, res, next) => {
    next(new appError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app;