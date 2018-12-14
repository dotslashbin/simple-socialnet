/**
 * Includes
 */
const express 	= require('express')
const app 		= express() 
const mongoose 	= require('mongoose')

// DB Config
const db 		= require('./config/keys').mongoURI

// Required Routes
const users 	= require('./routes/api/users.js')

// Connect to mongodb
mongoose.connect(db).then(() => console.log('Mongodb database connected')).catch((err) => console.log(err))

/**
 * Initial Variables
 */
 const port 	= process.env.PORT || 5000

// Default
app.get('/', (req, res) => res.send('Hello from e .. additional testing'))

// Routes
app.use('/api/users', users)


app.listen(port, () => console.log('SimpleSocial running on port: ' + port))	