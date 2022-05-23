const express = require('express')
const dotenv = require('dotenv')

const app = express()


const PORT = 3000 || process.env.PORT
app.listen(PORT)


const userRouter = require('./routes/userRoutes')
app.use('/api/user', userRouter)

const smsRouter = require('./routes/smsRoutes')
app.use('/api/sms', smsRouter)


