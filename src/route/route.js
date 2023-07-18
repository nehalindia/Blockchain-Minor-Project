const express = require('express')
const router = express.Router()

const {cryptoData} = require('../controller/cryptoController')

router.get('/crypto',cryptoData)

module.exports = router