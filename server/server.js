const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
require('dotenv').config()

const auth = require('./routes/auth')
const cinema = require('./routes/cinema')
const theater = require('./routes/theater')
const movie = require('./routes/movie')
const showtime = require('./routes/showtime')

mongoose.set('strictQuery', false)
mongoose
	.connect('mongodb+srv://gundaharishkumar2:Harish12@cluster0.xn7houi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { autoIndex: true })
	.then(() => {
		console.log('mongoose connected!')
	})
	.catch((err) => console.log(err))

const app = express()

app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
//app.use(cors({ origin: true, credentials: true }))
app.use(cors({origin:["https://cinemabooking-website-front.vercel.app"],
       methods:["POST","GET"],
	   credentials:true}))
app.use(express.json())
app.use(mongoSanitize())
app.use(helmet())
app.use(xss())

app.use('/auth', auth)
app.use('/cinema', cinema)
app.use('/theater', theater)
app.use('/movie', movie)
app.use('/showtime', showtime)

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`start server in port ${port}`))
