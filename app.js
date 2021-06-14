const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')

const globalErrorHandler = require('./controller/errorController')
const appError = require('./utils/appError')
const email = require('./utils/email')
const childRouter = require('./router/child');
const authRouter = require('./router/user')


app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use('/api/v1/user', authRouter)
app.use('/api/v1/child', childRouter)

app.all(`*`, (req, res, next) => {
    next(new appError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app;