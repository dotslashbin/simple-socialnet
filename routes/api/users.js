const express 	= require('express')
const router 	= express.Router()

router.get('/', (req, res) => res.send('from user file'))

module.exports = router