/**
 * Includes
 */
const express 		= require('express')
const app 			= express() 
const mongoose 		= require('mongoose')
const bodyParser 	= require('body-parser')

// DB Config
const db 		= require('./config/keys').mongoURI

// Required Routes
const users 	= require('./routes/api/users.js')
const profile 	= require('./routes/api/profile.js')
const posts 	= require('./routes/api/posts.js')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// Connect to mongodb
mongoose.connect(db).then(() => console.log('Mongodb database connected')).catch((err) => console.log(err))

/**
 * Initial Variables
 */
 const port 	= process.env.PORT || 5000

// Default
app.get('/', (requests, response) => response.send('Hello from e .. additional testing'))

// Routes
// app.use('/api/users', users)
// app.use('/api/profile', profile)
// app.use('/api/posts', posts)

app.use('/api/users', users)


app.listen(port, () => console.log('SimpleSocial running on port: ' + port))	