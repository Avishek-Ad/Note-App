require('dotenv').config()
const express = require('express')
const app = express()

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

//database
const connectDB = require('./db/connect')

const authenticateUser = require('./middlewares/authentication')

//routers
const noteRouter = require('./routes/routes')
const authRouter = require('./routes/auth')

//error handlers
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15*60*1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())

//routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/notes',authenticateUser, noteRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port} ...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()