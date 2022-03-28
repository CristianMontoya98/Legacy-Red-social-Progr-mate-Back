const router = require('express').Router()
const controllerUser = require('../controllers/userLogin.controller')
const auth = require('../../utils/middleware/auth')
const authAdmin = require('../../utils/middleware/authAdmin')

router.post('/register_admin', controllerUser.registerAdmin)

router.post('/activation', controllerUser.activateEmail)

router.post('/login', controllerUser.login)

router.post('/refresh_token', controllerUser.getAccessToken)

router.post('/forgot', controllerUser.forgotPassword)

router.post('/reset', auth, controllerUser.resetPassword)

router.get('/info', auth, controllerUser.getUserInfor)

router.get('/all_info', auth, authAdmin, controllerUser.getUsersAllInfor)

router.get('/logout', controllerUser.logout)

module.exports = router