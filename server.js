/**
 * Includes
 */
const express 	= require('express')
const app 		= express() 

/**
 * Initial Variables
 */
 const port 	= process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello from server .. additional testing'))

app.listen(port, () => console.log('SimpleSocial running on port: ' + port))	