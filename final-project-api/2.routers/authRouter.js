const express = require('express')
const router = express.Router()
const {authController} = require('../1.controllers/index')

router.get('/checkuser', authController.checkUser)
router.post('/register', authController.register)

module.exports = router